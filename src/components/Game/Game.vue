<template>
  <v-container >
      <v-layout row align-start justify-center>
        <v-flex xs4>
            <div v-show="gamestatus != 0 " class="item elevation-5">
                <h4>Score:{{ score }}</h4>
            </div>
        </v-flex>
        <v-flex xs4>
            <div v-if="gamestatus == 0" class="item elevation-5">
                <span>CountDown1:</span>
                <span>{{count}}</span>
            </div>
            <div v-if="gamestatus >0 && gamestatus <5" class="item elevation-5">
                <span>CountDown2:</span>
                <span>{{count}}</span>
            </div>          
        </v-flex>
        <v-flex xs4>
             <div v-show="gamestatus != 0 " class="item elevation-5">
                <h4>Score:{{ opscore }}</h4>
             </div>
        </v-flex>
      </v-layout>
      <v-layout row align-start justify-center >
        <v-flex  xs12>
            <div v-show="gamestatus >0 && gamestatus <5 ">
                <h3>{{currentques.ques}}</h3>
                <h4>{{ answer[0] }}  ||| {{ answer[1] }}</h4>
                
                <ul>
                        <li v-for="(value, index) in currentques.options"
                            @click="check(index+1)" 
                            :key = "index"
                            :class="{correct: status=='correct' && currentques.ans == index+1 , error: status=='wrong' && temp == index+1 }"
                            class="option"
                            >
                            
                            {{value}}
                        </li>
   
                </ul>
            </div>
          <div v-show="gamestatus == 5 ">
              <h3>End Game</h3>
          </div>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000/');
export default {
  name: 'Game',
  data () {
    return {
      user:[],
      gamestatus:0, //0:Setting //1:ques1 //2:ques2 //5:End
      temp:"",
      data:[],
      questions:[],
      timer: null,
      timeout:null,
      count:'5', //display for countdown
      opscore:0, 
      score:0,// [0,0] [first person score, second person score]
      answer:[0,0],
      currentques: "",
      status:"" // correct or wrong
    }
  },
  created:function(){
      
     // this.fetchdata()
      console.log("In Game Page")
      socket.emit("Starting")
      

  },
  mounted:function(){
      
      socket.on("Permission",(data)=>{
          if(data.data == "Yes")
          {
              this.settimer(5)
              this.questions = data.questions
              this.currentques = data.questions[0]
          }
          else{
              console.log("FAIL!")
          }
      })
      
      socket.on("Next",(data)=>{
            this.opscore = data.score
            this.answer[1]  = data.ans 
      })

      socket.on("FinishChoosen",(data)=>{

            this.cleartime();
            this.pick()
            this.settimer(8)
      })

  },
  methods:{

      async settimer(t){
          this.count = t
          this.timer = setInterval(() => {
              this.count = this.count - 1
              if (this.count === 0){
                  clearInterval(this.timer)
              }
          }, 1000)
          this.timeout = setTimeout(()=>{
              // If no one answers
              this.pick()
              this.cleartime()
              this.settimer(8)
          },t*1000)
      },
      check(index){
          this.temp = index
        $(".option").css('pointer-events', 'none');
        if(this.currentques.ans === index){
            console.log("right")
            this.score=this.score+10;
            this.status='correct'
        } else{
            console.log("wrong")
            this.status="wrong"
        }
        
        socket.emit('Choose',{"ans":index,"correct":this.status,"score":this.score})
        
      },
      pick(){ 
         if(this.gamestatus == 4){
            this.gamestatus +=1
            return
          }
          this.gamestatus +=1 
          this.currentques = this.questions[this.gamestatus-1]
          this.status=''
          $(".option").css('pointer-events', 'auto');
      },
      cleartime(){
            clearTimeout(this.timeout)
            clearInterval(this.timer)
      },
      setdatas(){
         // socket.emit("SetData",{"skills": this.skills})
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
ul{
    list-style:none;
}
li{
    border: white 2px solid;
    color: white;
    margin-top:20px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}

</style>
