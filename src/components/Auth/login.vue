<template>
  <!--<div class="login">-->
    
    <!-- <div class="g-signin2"  data-theme="dark"></div>-->
     <!--<div>{{msg}}</div>-->
     <!--<a href="#" v-on:click="signOut">Sign out</a>-->
    <!-- <button v-on:click="show">show</button>-->
     <!--<button v-on:click="test">test</button>-->
   <!--</div>-->
   <v-layout column>
    <v-flex xs6 offset-xs3>

        <v-text-field
          label="Email"
          v-model="email"
        ></v-text-field>
        <br>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="login">
          Login
        </v-btn>

    </v-flex>
  </v-layout>
</template>

<script>
import Auth from '@/lib/Auth'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      email:"",
      password:"",
      error:''
    }
  },
  metaInfo:{
    meta: [
      { name:"google-signin-scope",content:"profile email"},
      { name:"google-signin-client_id", content:"401304009501-hio02ov3682aruff02dckvcfhpnshngi.apps.googleusercontent.com"}
    ]
  },
  methods :{
    show(){
      console.log('-----------------------');
      var googleUser= gapi.auth2.getAuthInstance().currentUser.get(); 
      //var profile = googleUser.getBasicProfile();
      console.log("ID: " + googleUser.getBasicProfile().getId()); // Don't send this directly to your server!
      console.log('Full Name: ' + googleUser.getBasicProfile().getName());
      console.log('IF SIGNED'+ gapi.auth2.getAuthInstance().isSignedIn.get());
      console.log('-----------------------');
    },
    signOut(){
      console.log('-----------------------');
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        console.log('IF SIGNED'+ auth2.isSignedIn.get());
        var googleUser= auth2.currentUser.get(); 
        console.log("ID: " + googleUser.getBasicProfile().getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + googleUser.getBasicProfile().getName());
        console.log('-----------------------');
      });
 
    },   
    async login () {
      try {
        const response = await Auth.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    test(){
      
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
