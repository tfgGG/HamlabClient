<template>
    <v-container>
       <v-layout  column justify-center align-center>
            <v-flex xs12>
                <div id="gSignInWrapper">
                    <div id="customBtn" class="customGPlusSignIn">
                        <span class="icon"></span>
                        <span class="buttonText">以Google帳號繼續</span>
                    </div>
                </div>
            </v-flex>
             <Register></Register>
        </v-layout>
        
    </v-container>
</template>
<script>
import Register from './Register.vue'
export default {
    name:'registermain',
    components:{
        Register:Register
    },
    data() {
        return {
            googleUser : {}
        }
    },
    mounted() {
        this.startapp()
    },
    methods: {
        startapp(){
            gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
                gapi.auth2 = gapi.auth2.init({
                    client_id: '401304009501-i3dbur4ug9m85vd0fma52aousv4u9097.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                });
                this.attachSignin(document.getElementById('customBtn'));
            });
        },
        attachSignin(element) {
            gapi.auth2.attachClickHandler(element, {},
            (googleUser)=> {
                document.getElementById('name').innerText = "Signed in: " +googleUser.getBasicProfile().getName();
            }, 
            (error)=> {
                alert(JSON.stringify(error, undefined, 2));
            });
        }
    },
    
}
</script>
<style scoped>
 #customBtn {
      display: inline-block;
      background: white;
      color: #444;
      width: 190px;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
    }
    #customBtn:hover {
      cursor: pointer;
    }
    span.label {
      font-family: serif;
      font-weight: normal;
    }
    span.icon {
      background: url('https://google-developers.appspot.com/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
      display: inline-block;
      vertical-align: middle;
      width: 42px;
      height: 42px;
    }
    span.buttonText {
      display: inline-block;
      vertical-align: middle;
      padding-left: 42px;
      padding-right: 42px;
      font-size: 14px;
      font-weight: bold;
      /* Use the Roboto font that is loaded in the <head> */
      font-family: 'Roboto', sans-serif;
    }
</style>
