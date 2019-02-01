<template>
    <v-layout align-center justify-center row>
        <v-flex xs12 sm6 md4>

            <v-container grid-list-lg fluid>
                <v-layout row wrap>
                    <v-flex
                    xs6
                    md4
                    @click="choosemug" 
                    v-for="p in pic" 
                    :key="p" 
                    >
                    <v-card class="options">
                        <v-img :aspect-ratio="1/1"  :src="getImgUrl(p)"></v-img>
                    </v-card>

                    </v-flex>
                    <v-flex xs6 md4>
                        <v-card class="options">
                            上傳自己
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <h2>
                    輸入名字
                    </h2>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>
<script>
import Auth from '@/lib/Auth'
export default {
     data: () => ({
        pic:["Gray.png","Yang.png","Gray.png","Yang.png"],
    }),
    mounted() {
        
    },
    methods: {
        choosemug(){

        },
        chooseback(){

        },
         getImgUrl(pet) {
            var images = require.context('../../assets/img/', false, /\.png$/)
            console.log(images)
            return images("./"+pet)
        },
        entername(){
            //TODO:
        }
    },

}
</script>
<style scoped>
.options:hover{
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.9s;
}
</style>
