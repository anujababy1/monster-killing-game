const randomNumber = (min,max)=>{
    return Math.floor((Math.random() * (max-min))+min);
}
const app = Vue.createApp({
    data(){
        return {
            monsterHealth : 100,
            playerHealth:100,
            currentRound:0,
            winner:null,
        }
    },
    methods:{
        attackMonster(){
           
            this.currentRound++;
            const attack = randomNumber(12,5);
            this.monsterHealth -=attack;
            this.attackPlayer();
        },
        attackPlayer(){
            if(this.winner){
                return;
            }
            const attack = randomNumber(8,15);
            this.playerHealth -=attack;
        },
        specialAttackMonster(){
            
            this.currentRound++;
            const attack = randomNumber(10,25);
            this.monsterHealth -=attack;
            this.attackPlayer();
        },
        healPlayer(){
            
            this.currentRound++;
            const heal = randomNumber(8,20);
            if(this.playerHealth+heal >100){
                this.playerHealth =100;
            }else{
                this.playerHealth +=heal;
            }
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'monster';
        },
        restart(){
            this.monsterHealth = 100;
            this.playerHealth=100;
            this.currentRound=0;
            thsi.winner=null;
        }
        
    },
    computed:{
        mosterHealthBarStyle(){
            
            if(this.monsterHealth <=0){
                return {width:'0%'}
            }
            return {width:this.monsterHealth+'%'}
        },
        attackerHealthBarStyle(){
            
            if(this.playerHealth <=0){
                return {width:'0%'}
            }
            return {width:this.playerHealth+'%'}
        },
        canDisableSpecialAttack(){
           
            return (this.currentRound % 3 !==0)
        },
        
    },
    watch:{
        monsterHealth(newVal,oldVal){
            if(newVal <=0 && this.playerHealth <=0){ console.log(1);
                this.winner= 'draw';
            }
            else if(newVal <=0){
                this.winner = 'player';
            }
        },
        playerHealth(newVal){
            if(newVal <=0 && this.monsterHealth <=0){
                console.log(1);
                this.winner= 'draw';
            }
            else if(newVal <=0){
                this.winner = 'monster';
            }
        },
        
    }

})

app.mount('#game');