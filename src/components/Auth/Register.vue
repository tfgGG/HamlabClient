<template>
    <v-flex xs12>
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
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          Register
        </v-btn>
      </v-card>
    </v-flex>
</template>

<script>
import Auth from '@/lib/Auth'
import ChoosePic from '@/components/Auth/ChoosePic.vue'
export default {
  name: 'register',
  components:{
    ChoosePic:ChoosePic
  },
  data () {
    return {
      email:'',
      password:'',
      error:''
    }
  },
  methods:{
    async register(){
      try{
           await Auth.register({
             email:this.email,
             password:this.password,
          })
          this.error ='Success'
          //TODO:Push route
          $route.push("ChoosePic")

      }catch(error){
        this.error = error.response.data.error
        console.log(error.response)
      }
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
