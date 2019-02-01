<template>
        <v-container grid-list-lg >
            <h4 class="display-1">SHOP</h4>
            <v-layout row wrap align-start>
                <v-flex v-for="i in items" :key="i.itemid" xs12 md4 d-flex >
                    <v-card height="200px" >
                        <v-card-title class='title'>{{i.name}}</v-card-title>
                        <v-img></v-img>
                        <v-card-actions>
                            <v-btn flat color="white"  @click="opendialog(i)" fluid>Shop</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            <!--DIALOG-->
            <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">確定購買</v-card-title>

                <v-card-text>
                    確定要花{{dialogitem.points}} <b>{{dialogitem.name}}</b>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog = false"
                >
                    取消
                </v-btn>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog = false"
                >
                    確定購買
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <!--END-->
            </v-layout>
   
         </v-container>
</template>
<script>
import Shop from '@/lib/Shop'
export default{

    components:{
        
    },
    data(){
        return {
            items:null,
            dialog:null,
            dialogitem:null
        }
    },
    async mounted(){
        this.items = (await Shop.getItem()).data
        this.dialogitem = this.items[0]
        console.log(this.items)
    },
    methods:{
        opendialog(i){
            this.dialog = true
            this.dialogitem = i
        }
    }



}


</script>
<style scoped>

</style>

