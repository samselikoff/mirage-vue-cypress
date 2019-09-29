<template>
  <div id="app">
    <li class="user" v-for="movie in movies" v-bind:key="user.attributes.name">
      {{ movie.attributes.name }}
    </li>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data(){
    return {
      movies: []
    }
  },
  created: function () {
    axios.get('/api/movies')
      .then(response => response.data)
      .then(json => this.movies = json.data);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
