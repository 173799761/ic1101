<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Foot.vue'
   export default {
    name: 'app',
    components: {
      Header,
      Footer
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  width: 100%;
}
</style>
