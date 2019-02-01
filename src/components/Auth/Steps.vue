<template>
    <v-layout row wrap>
      <v-flex v-for="i in 3" :key="`4${i}`" xs4>
        <v-card dark color="primary" status="{}">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
</template>
<script>
export default {
    props:['steps']
}
</script>
<style scoped>

</style>
