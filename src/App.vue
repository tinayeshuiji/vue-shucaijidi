<template>
  <div id="app">
   <Header v-if="$store.state.showBottomNav"></Header>
    <div>
      <router-view/>
    </div>
    <Footer v-if="$store.state.showBottomNav"></Footer>
    
  </div>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";
export default {
  name: 'App',
  components:{
    Footer,
    Header
  },
  data(){
    return{
      navIndex:''
    }
  },
    watch: {
    $route() {
      // 获取当前路径
      let path = this.$route.path;
      // 检索当前路径
      console.log(path)
      if(path=='/home'||path=='/cat'||path=='/cart'||path=='/mine'){
         this.$store.commit('changeBottomNav', true)
      }else{
         this.$store.commit('changeBottomNav', false)
      }
      
    }
  
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
