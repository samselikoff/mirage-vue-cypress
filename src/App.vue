<template>
  <div id="app">
    <div v-if='movies.length'>
      <li class="movie" v-for="movie in movies" v-bind:key="movie.id">
        {{ movie.id }} <button @click='deleteMovie(movie.id)'>Delete {{movie.id}}</button>
      </li>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',

  data() {
    return {
      movies: []
    }
  },

  methods: {
    deleteMovie(movieId) {
      axios.delete(`/api/movies/${movieId}`)
        .then(response => response.data)
        .then(json => {
          this.movies = this.movies.filter(movie => movie.id !== movieId)
        })
    }
  },

  created: function () {
    axios.get('/api/movies')
      .then(response => response.data)
      .then(json => {
        this.movies = json.movies;
      })
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
