<template>
    <v-container>
        <div>
            <v-text-field v-model="username" type="text"></v-text-field>
            <v-btn @click="match">Enter</v-btn>
        </div>
        <div>
            <h3>{{status}}</h3>
        </div>
    </v-container>
</template>

<script>
import io from 'socket.io-client';
//const socket = io('https://localhost:3000/matchio');
const socket = io('https://whispering-forest-23961.herokuapp.com/matchio');
export default {
    name:'Begin',
    data () {
        return{
            connected:false,
            username:"Visitor",
            status:"Waiting"
        }
    },
    mounted:function(){
        
        const store = this.$store
        socket.on("send",(data)=>{
            store.dispatch("setroomid",data)
            window.location.href = "/Game"
        })

    },
    methods:{
        match(){
            socket.emit('Matching', {"username":this.username})
        },
    }
}

</script>

<style scoped>


</style>