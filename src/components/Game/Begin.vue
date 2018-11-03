<template>
    <v-layout column>
        <div>
            <input v-model="username" type="text">
            <v-btn @click="match">Enter</v-btn>
            <v-btn @click="show">Show</v-btn>
        </div>
    </v-layout>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000/');
export default {
    name:'Begin',
    data () {
        return{
            connected:false,
            username:"Visitor"
        }
    },
    mounted:function(){
        
        socket.on("send",(data)=>{
            console.log("Get Test")
            console.log(data)
        })

        socket.emit('Matching', {"username":this.username})

    },
    methods:{
        match(){
            socket.emit('Matching', {"username":this.username})
        },
        show(){
            console.log("SHOW")
        }
    }
}

</script>

<style scoped>


</style>