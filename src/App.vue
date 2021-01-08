<template>
  <div class="container-fluid mt-5">
    <Header />
    <PlayerList />
  </div>
</template>

<script>
import Header from './components/Header'
import PlayerList from './components/PlayerList.vue'

export default {
  name: 'App',
  components: {
    Header,
    PlayerList
  }
}
</script>

<style>

</style>