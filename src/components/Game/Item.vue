<template>
    <v-container>
        <h5></h5>
        <v-card>
            <div v-for="item in useritem" :key='item.id' >
                {{item.content.name}}
            </div>
        </v-card>
    </v-container>
</template>
<script>
import Auth from '@/lib/Auth'
export default {
    name:"Item",
    props:['sta'],
    data() {
        return {
            res:{}
            
        }
    },
    computed: {
        useritem(){
            return this.$store.state.useritem
        }
    },
    mounted() {

        this.init();
        //
    },
    methods: {
        pick(item){
            //await Auth.pickitem(item)
        },
        async init(){
            const store = this.$store
            const response = await Auth.getuserItem(1)//
            store.dispatch("setItem",response.data);
           
        }
    },
}
</script>
<style scoped>

</style>
