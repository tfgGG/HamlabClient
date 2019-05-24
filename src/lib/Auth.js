import Api from '@/lib/Api'

export default {
      register (credentials) {
        console.log(credentials)
        return Api().post('/register', credentials)
      },
      login (credentials) {
        return Api().post('/login', credentials)
      },
      
      getdefaultpic(){
        return Api().get('/GET/defaultpic')
      },

      getuserItem(uid){
        return Api().get('/GET/useritem/'+uid)
      }
}