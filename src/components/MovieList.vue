<template>
  <div>
    <div v-if="loading">
      <p data-testid="loading">Loading...</p>
    </div>

    <div v-else>
      <form @submit.prevent="createMovie">
        <label>Add a movie:</label>
        <input v-model="newMovieTitle" type="text" data-testid="add-movie" />
      </form>

      <div v-if="movies.length === 0">
        <p>No movies!</p>
      </div>

      <div v-else>
        <li
          class="movie"
          style="list-style: none;"
          v-for="movie in movies"
          v-bind:key="movie.id"
          data-testid="movie"
        >
          <form style="display: inline;" @submit.prevent="updateMovie(movie)">
            <input type="text" data-testid="edit-movie" v-model="movie.title" />
          </form>

          <router-link :to="`/movies/${movie.id}`">Detail</router-link>
          <button @click="deleteMovie(movie.id)">Delete {{ movie.id }}</button>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      newMovieTitle: "",
      movies: []
    };
  },

  methods: {
    updateMovie(movie) {
      axios.patch(`/api/movies/${movie.id}`, { movie }).then(json => {
        let i = this.movies.findIndex(m => m.id === movie.id);
        this.movies[i] = json.data.movie;
      });
    },
    createMovie() {
      axios
        .post("/api/movies", { movie: { title: this.newMovieTitle } })
        .then(json => {
          this.movies.push(json.data.movie);
          this.newMovieTitle = "";
        });
    },

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
