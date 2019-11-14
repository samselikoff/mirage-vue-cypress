<template>
  <div id="app">
    <h1>Movies asdf</h1>
    <div v-if="loading">
      <p data-testid="loading">Loading...</p>
    </div>

    <div v-else-if="movies.length === 0">
      <p>No movies!</p>
    </div>

    <div v-else>
      <li
        class="movie"
        v-for="movie in movies"
        v-bind:key="movie.id"
        data-testid="movie"
      >
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
