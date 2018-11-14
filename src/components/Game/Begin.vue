<template>
    <v-container>
        <div>
            <v-text-field v-model="username" type="text"></v-text-field>
            <v-btn @click="match">Enter</v-btn>
        </div>
    </v-container>
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
            console.log(data.test)
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