<template>
   <v-layout column>
    <v-flex xs6 offset-xs3>
      <v-card title="Register">
        <form 
          name="tab-tracker-form"
          autocomplete="off">
          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
        </form>
        <br>
        <div class="danger-alert"  />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          Register
        </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Auth from '@/lib/Auth'
export default {
  name: 'Register',
  data () {
    return {
      email:'',
      password:''
    }
  },
  methods:{
    async register(){
      try{
           await Auth.register({
             email:this.email,
             password:this.password,
             error: null
          })
      }catch(error){
        this.error = error.response.data.error
      }
        
        console.log(response.data);
    }

  }
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
