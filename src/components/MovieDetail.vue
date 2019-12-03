<template>
  <div>
    <router-link to="/">Home</router-link>

    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <h2>Details for {{ movie.title }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      movie: null
    };
  },

  created: function() {
    console.log("here!");

    axios.get(`/api/movies/${this.$route.params.id}`).then(res => {
      this.loading = false;
      this.movie = res.data.movie;
    });
  }
};
</script>
