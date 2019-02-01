<template>
  <v-container style="">
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
                <h3>{{currentques.question}}</h3>
                <h4>{{ answer }}  ||| {{ opanswer }}</h4>
                
                <ul>
                        <li v-for="(value, index) in currentques.options"
                            @click="check(index+1)" 
                            :key = "index"
                            :class="{correct: (status=='correct' || opstatus=='correct')&& currentques.ans == index+1,
                                    error: (status=='wrong' && answer == index+1) || (opstatus=='wrong' && opanswer == index+1) }"
                            class="option"
                            >
                            <!--own answer-->
                            <span v-if = " status=='correct' && answer == index+1 " style="">O</span>
                            <span v-if = "status=='wrong' && answer == index+1" style="">X</span>
                            {{value}}
                            <span v-if = "opstatus=='correct' && opanswer == index+1" style="">O</span>
                            <span v-if = "opstatus=='wrong' && opanswer == index+1" style="">X</span>
                        </li>
   
                </ul>
            </div>
            <div>
                {{answeredstatus}}
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
//var socket = io.connect("https://whispering-forest-23961.herokuapp.com/");
var socket = io.connect('http://localhost:3000/')
export default {
  name: 'Game',
  data () {
    return {
      user:[],
      gamestatus:0, //0:Setting //1:ques1 //2:ques2 //5:End
      data:[],
      questions:[],
      currentques: "",
      timer: null,
      timeout:null,
      count:'5', //display for countdown
      opscore:0, 
      score:0,//
      answer:0,
      opanswer:0,
      status:"",
      opstatus:"", // correct or wrong
      answeredstatus:"",
      socketid:""
    }
  },
  computed:{
      roomid(){
          return this.$store.state.roomid
      }
  },
  watch: {
      roomid:()=>{
          if(roomid == '')
            location.href = "http://localhost:8080/Begin"
      }
  },
  created:function(){
      
      console.log("In Game Page")
      socket.emit("Starting",this.roomid)

  },
  mounted:function(){
      
      socket.on("Permission",(data)=>{
          this.socketid = socket.id
          if(data.data == "Yes")
          {
              //Before Playing Game
              this.settimer(5)
              //Move to question 1
              this.questions = data.questions
              console.log(data.questions)
              this.currentques = data.questions[0]
              
          }
          else{
              console.log("Fail to Enter Game")
              alert("Fail to Enter Game")        
          }
      })
      
      socket.on("Next",(data)=>{
            this.opscore = data.score
      })

      socket.on("FinishChoosen",(data)=>{
            console.log("Both People Choosed")
            console.log(socket.id)
            console.log(data)
            var thisstatus = "";
            if(data.length == 2 )
            {
                if(data[0].socketid == socket.id)
                {
                    this.opanswer  = data[1].ans 
                    this.opstatus = data[1].status
                    this.opscore = data[1].score
                }else{
                    this.opanswer  = data[0].ans 
                    this.opstatus = data[0].status
                    this.opscore = data[0].score
                }
                thisstatus = "Both choosed";

            }else if(data.length == 1 ){
                if(data[0].socketid == socket.id)
                {
                    this.opanswer  = data[1].ans 
                    this.opstatus = data[1].status
                    this.opscore = data[1].score
                }
                thisstatus="Only One choose"
            }else{
                thisstatus="No one choose"
            }
            clearInterval(this.timer)
            clearTimeout(this.timeout)
            setTimeout(()=>{
                this.answeredstatus = thisstatus
                socket.emit("FinishUpdateScore",this.roomid)
            },3500)
           
      })

      socket.on("ChangeToNext",(answered)=>{

          this.pick()
          this.settimer(8)
      })

  },
  methods:{

      settimer(t){
          this.count = t
          this.timer = setInterval(() => {
              this.count = this.count - 1
              if (this.count === 0){
                  clearInterval(this.timer)
              }
          }, 1000)

          this.timeout = setTimeout(()=>{
              clearTimeout(this.timeout)
              if(this.gamestatus>0)
                socket.emit("Choose",{},this.roomid)
              else if(this.gamestatus==0)
              {
                this.settimer(8)
                this.gamestatus+=1
              }
          },t*1000)
      },
      check(index){
        this.answer = index
        $(".option").css('pointer-events', 'none');
        if(this.currentques.ans === index){
            console.log("right")
            this.score=this.score+10;
            this.status='correct'
        } else{
            console.log("wrong")
            this.status="wrong"
        }
        
        socket.emit('Choose',{"ans":index,"status":this.status,"score":this.score},this.roomid)
        
      },
      pick(){ 
         if(this.gamestatus == 5){
            this.gamestatus +=1
            socket.emit("End",this.roomid)
            this.$store.dispatch("setroomid",'')
            return ;
          }
          this.gamestatus +=1 
          this.currentques = this.questions[this.gamestatus-1]
          this.status=''
          this.opstatus=''
          this.answer =0
          this.opanswer = 0
          $(".option").css('pointer-events', 'auto');
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
