<template>
  <div class="container-fluid">

    <div class="row">
      <div class="col-12 mt-3">
        <h1>Player List</h1>
      </div>
    </div>

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
          <tr v-for="player in players" :key="player.name">
            <td>{{player.id}}</td>
            <td>{{player.name}}</td>
            <td><img :src="player.thumbnail" class="rounded-3 w-25" :alt="`image-${player.thumbnail}`"></td>
            <td>{{player.age}}</td>
            <td>{{player.weight}}</td>
            <td>{{player.height}}</td>
            <td>{{player.hair_color}}</td>
            <td>{{player.professions}}</td>
            <td>{{player.friends}}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Loading from './Loading'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {Loading},
  setup() {
    const store = useStore()

    const players = computed(() => {
      return store.getters.listPlayers
    })

    onMounted(async() => {
      await store.dispatch('getPlayers')
    })

    console.log(players)
    return {players}
  }
}
</script>

<style>

</style>