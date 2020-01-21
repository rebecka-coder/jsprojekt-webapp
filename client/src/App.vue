<template>
  <div id="app">
     <img alt="vegetables" src="./assets/grocerys.jpg">
    <PostComponent/>
  </div>
</template>

<script>
import PostComponent from './components/PostComponent.vue'

export default {
  name: 'app',
  components: {
    PostComponent
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fff6e5;
  line-height: 1.6em;
  margin: 0 auto;
  padding: 0;
  width: 100vw;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  margin-bottom: 2em;
}
</style>
