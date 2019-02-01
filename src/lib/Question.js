import Api from '@/lib/Api'

export default {
    getItem () {
        return Api().get('/GET/question')
    },
}