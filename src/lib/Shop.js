import Api from '@/lib/Api'

export default {
    getItem (credentials) {
        console.log(credentials)
        return Api().get('/getitem')
    },
}