<template>
    <v-container style="">
        <div v-if='status==0'>
            <v-text-field v-model="username" type="text"></v-text-field>
            <v-btn @click="match">Start Match</v-btn>
        </div>
        <div>
            <div v-if="status == 1" class="body-wrapper">
                <div class="body-page">
                    <main>
                    <div class="loading">
                        <h1>Waiting for Match</h1>
                        <div class="dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        </div>
                    </div>
                    <div class="content"></div>
                    </main>
                    <footer>sticky footer</footer>
                </div>
            </div>
            <h3>{{status}}</h3>
        </div>
    </v-container>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000/matchio');
//const socket = io('https://whispering-forest-23961.herokuapp.com/matchio');

export default {
    name:'Begin',
    data () {
        return{
            connected:false,
            username:"Visitor",
            status:"0"
        }
    },
    mounted:function(){
        
        const store = this.$store
        socket.on("send",(data)=>{
            store.dispatch("setroomid",data)
            this.$router.push('game') //window.location.href = "/Game"
        })

    },
    methods:{
        match(){
            socket.emit('Matching', {"username":this.username})
            this.status = 1 //Wait For Matching
        },
    }
}

</script>

<style scoped src='@/assets/css/WaitingAnimation.css'>

</style>