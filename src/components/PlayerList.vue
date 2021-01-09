<template>
  <div class="container-fluid">

    <div class="row">
      <div class="col-12 mt-3">
        <h1>Player List</h1>
      </div>
    </div>

    <Header />
    <Loading />

    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
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
          <!--<tr v-for="(player, index) in players" :key="player.name" v-show="(pag - 1) * num_results <= index && pag * num_results > index">-->
          <tr v-for="player in players" :key="player.name">
            <td>{{player.id}}</td>
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
      <!--Controles
      <nav aria-label="Page navigation" class="text-center">
        <ul class="pagination text-center">
          <li>
            <a href="#" aria-label="Previous" v-show="pag != 1" @click.prevent="pag -= 1">
              <span aria-hidden="true">Anterior</span>
            </a>
          </li>
          <li>
            <a href="#" aria-label="Next" v-show="pag * num_results / players.length < 1" @click.prevent="pag += 1">
              <span aria-hidden="true">Siguiente</span>
            </a>
          </li>
        </ul>
      </nav>
      -->
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

    onMounted(async() => {
      await store.dispatch('getPlayers')
      await store.dispatch('filterName', '')
    })

    return {players}
  }
}
</script>

<style>

</style>