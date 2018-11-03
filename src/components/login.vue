<template>
  <div class="login">
    
    <div class="g-signin2"  data-theme="dark"></div>
    <div>{{msg}}</div>
    <a href="#" v-on:click="signOut">Sign out</a>
    <button v-on:click="show">show</button>
    <button v-on:click="test">test</button>
  </div>
</template>

<script>
import google from '@/lib/google';

export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
