<template>
  <div>
        <div v-if="gamestatus == 0">
          <span>CountDown1:</span>
          <span>{{count}}</span>
        </div>
        <div v-if="gamestatus >0 && gamestatus <5">
          <span>CountDown2:</span>
          <span>{{count}}</span>
        </div>
        {{gamestatus}}
        <div v-show="gamestatus != 0 ">
          <h4>Score:{{score}}</h4>
        </div>
        <div v-show="gamestatus >0 && gamestatus <5 ">
          <h3>{{currentques.ques}}</h3>
          <ul >
                <li v-for="(value, index) in currentques.options"
                    @click="check(index+1)" 
                    :key = "index"
                    :class="{correct: status=='correct' && currentques.ans == index+1 , error: status=='wrong' && currentques.ans != index+1 }">
                    {{value}}
                </li>
          </ul>
        </div>
          <div v-show="gamestatus == 5 ">
              <h3>End Game</h3>
          </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000/');
export default {
  name: 'Game',
  data () {
    return {
      user:[],
      msg: 'Welcome to Your Vue.js App',
      gamestatus:0, //0:Setting //1:ques1 //2:ques2 //5:End
      data:[],
      questions:[],
      timer: null,
      timeout:null,
      count:"", //display for countdown
      score: [0,0] , // [0,0] [first person score, second person score]
      currentques: null,
      status:"" // correct or wrong
    }
  },
  created:function(){
      this.settimer(5)
      this.fetchques()
  },
  mounted:function(){
      
  },
  methods:{
      fetchques(){
          this.data = [
                {
                    "ques": "1. 請問答案是多少",
                    "ans": 1,
                    "options" : ["我是答案!!","我不是答案","我不是答案","我不是答案"]
                },
                {
                    "ques": "2. 請問答案是多少",
                    "ans": 1,
                    "options" : ["我是答案!!","我不是答案","我不是答案","我不是答案"]
                },
                               {
                    "ques": "3. 請問答案是多少",
                    "ans": 3,
                    "options" : ["我不是答案","我不是答案","我是答案!!","我不是答案"]
                },
                {
                    "ques": "4. 請問答案是多少",
                    "ans": 4,
                    "options" : ["我不是答案","我不是答案","我不是答案","我是答案!!"]
                },
                               {
                    "ques": "5. 請問答案是多少",
                    "ans": 4,
                    "options" : ["我不是答案","我不是答案","我不是答案","我是答案!!"]
                },
                {
                    "ques": "6. 請問答案是多少",
                    "ans": 2,
                    "options" : ["我不是答案","我是答案!!","我不是答案","我不是答案"]
                },
                {
                    "ques": "7. 請問答案是多少",
                    "ans": 3,
                    "options" : ["我不是答案","我不是答案","我是答案!!","我不是答案"]
                },
                {
                    "ques": "8. 請問答案是多少",
                    "ans": 1,
                    "options" : ["我是答案!!!","我不是答案","我不是答案","我不是答案"]
                },

          ]
          this.questions = this.data.sort((a,b)=>Math.random()-0.5).slice(4)
          this.currentques = this.questions[0]
      },
      control(){

      },
      async settimer(t){
          this.count = t
          this.timer = setInterval(() => {
              this.count = this.count - 1
              if (this.count === 0){
                  clearInterval(this.timer)
              }
          }, 1000)
          this.timeout = setTimeout(()=>{
              this.pick()
              this.settimer(8)
          },t*1000)
      },
      check(index){
        
        if(this.currentques.ans === index){
            console.log("right")
            this.score=this.score+10;
            this.status='correct'
        } else{
            console.log("wrong")
            this.status="wrong"
        }

            this.pick()
            this.cleartime()
            this.settimer(8)
        

      },
      pick(){ 
         if(this.gamestatus == 4){
            this.gamestatus +=1
            return
          }
          this.gamestatus +=1 
          this.status=''
          this.currentques = this.questions[this.gamestatus-1]

        
      },
      cleartime(){
            clearTimeout(this.timeout)
            clearInterval(this.timer)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.correct{
    background-color:aquamarine
}
.wrong{
    background-color:darkred
}
li{
    border:1px solid black
}

</style>
