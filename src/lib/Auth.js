import Api from '@/lib/Api'

export default {
    register(credentials){
        return Api().post('register',credentials)
    }
}