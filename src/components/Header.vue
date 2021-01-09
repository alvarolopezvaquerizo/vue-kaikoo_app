<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href=""><img src="../assets/logo.png" alt="logo" width="30" height="30" class="d-inline-block align-top"> KAIKOO-APP</a>
            <form class="d-flex">
                <input type="text" class="form-control me-2" placeholder="Search..." v-model="text" @keyup="processInput">
            </form>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const text = ref('')
        const store = useStore()

        const processInput = () => {
            store.dispatch('filterName', text.value)
        }

        return {text, processInput}
    }
}
</script>

<style>

</style>