<template>
  <div>
    <v-app dark>
      <v-content>
          <transition name='router-anim' enter-active-class="animated fadeInDown delay-3s" leave-to-class="animated fadeOutDown">
            <router-view></router-view>
          </transition>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
   components: {
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
