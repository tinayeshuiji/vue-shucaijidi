<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Footer,
    Header
  },
  data() {
    return {
      navIndex: ""
    };
  }
  
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  background: #fff;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
