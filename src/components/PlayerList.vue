<template>
  <div class="container-fluid">

    <Header />

    <div class="row">
      <div class="col-12 mt-3">
        <h1>Player List</h1>
      </div>
    </div>

    <Loading v-if="loading"/>

    <div class="row">
      <table class="table" v-if="!loading">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th class="w-25" scope="col">Thumbnail</th>
            <th scope="col">Age</th>
            <th scope="col">Weight</th>
            <th scope="col">Height</th>
            <th scope="col">Hair Color</th>
            <th scope="col">Professions</th>
            <th scope="col">Friends</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players" :key="player.name" v-show="(page - 1) * num_results <= index && page * num_results > index">
            <td>{{player.name}}</td>
            <td><img :src="player.thumbnail" class="rounded-3 w-25" :alt="`image-${player.thumbnail}`"></td>
            <td>{{player.age}}</td>
            <td>{{player.weight}}</td>
            <td>{{player.height}}</td>
            <td>{{player.hair_color}}</td>
            <td>
              <p v-for="professions in player.professions" :key="professions">{{professions}}</p>
            </td>
            <td>
              <p v-for="friends in player.friends" :key="friends">{{friends}}</p>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="card mb-3" v-for="(player, index) in players" :key="player.name" v-show="(page - 1) * num_results <= index && page * num_results > index">
        <div class="card-body">
          <h3 class="text-center mb-3">{{player.name}}</h3>
          <p class="text-center">
              <img :src="player.thumbnail" class="img-fluid rounded-3 w-50" :alt="`image-${player.thumbnail}`">
          </p>
          <p class="card-text">
            <span class="badge bg-dark d-block mb-1">Age: {{player.age}}</span>
            <span class="badge bg-success p-3 d-block mb-1">Weight: {{player.weight}}</span>
            <span class="badge bg-dark d-block mb-1">Height: {{player.height}}</span>
            <span class="badge bg-success d-block mb-1">Hair Color: {{player.hair_color}}</span>
            <span class="badge bg-dark d-block">- Professions -</span>
            <span class="badge bg-dark d-block" v-for="professions in player.professions" :key="professions">{{professions}}</span>
            <span class="badge bg-success d-block">- Friends -</span>
            <span class="badge bg-success d-block" v-for="friends in player.friends" :key="friends">{{friends}}</span>
          </p>
        </div>
      </div>

      <nav aria-label="Page navigation" class="text-center">
        <ul class="pagination">
          <li class="page-item">
            <a a class="page-link" href="#" v-show="page != 1" @click.prevent="decrementPage">Previous</a>
          </li>
          <li>
            <a a class="page-link" href="#" v-show="page * num_results / players.length < 1" @click.prevent="incrementPage">Next</a>
          </li>
        </ul>
      </nav>
      
    </div>

  </div>
</template>

<script>
import Header from './Header'
import Loading from './Loading'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {Header, Loading},
  setup() {

    const store = useStore()

    const players = computed(() => {
      return store.getters.listPlayers
    })

    let page = computed(() => {
      return store.getters.pagination
    })

    let num_results = computed(() => {
      return store.getters.limitPagination
    })

    const loading = computed(() => {
      return store.getters.loading
    })

    onMounted(async() => {
      await store.dispatch('getPlayers')
      await store.dispatch('filterName', '')
    })

    return {players, loading, page, num_results}

  },
  methods: {
    incrementPage() {
      this.$store.commit('setIncrementPage');
    },
    decrementPage() {
      this.$store.commit('setDecrementPage');
    }
  }
}
</script>

<style>
.card {
  display: none;
}
@media only screen and (max-width: 768px) {
  .table {
    display: none;
  }
  .card {
    display: block;
  }
}
</style>