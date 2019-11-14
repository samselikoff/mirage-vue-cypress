<template>
  <div id="app">
    <h1>Moviezzzs!</h1>
    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else>
      <li class="movie" v-for="movie in movies" v-bind:key="movie.id">
        {{ movie.id }}
        <button @click="deleteMovie(movie.id)">Delete {{ movie.id }}</button>
      </li>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",

  data() {
    return {
      loading: true,
      movies: []
    };
  },

  methods: {
    deleteMovie(movieId) {
      axios
        .delete(`/api/movies/${movieId}`)
        .then(response => response.data)
        .then(json => {
          this.movies = this.movies.filter(movie => movie.id !== movieId);
        });
    }
  },

  created: function() {
    console.log("in the vue app");

    axios.get("/api/movies").then(res => {
      this.loading = false;
      this.movies = res.data.movies;
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
