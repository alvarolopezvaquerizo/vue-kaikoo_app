import { createStore } from 'vuex';

export default createStore({
    state: {
        loading: true,
        num_results: 5,
        pag: 1,
        players: [],
        playersFilter: []
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setPlayers(state, payload) {
            state.players = payload;
        },
        setPlayersFilter(state, payload) {
            state.playersFilter = payload;
        },
        setIncrementPage(state) {
            state.pag += 1;
        },
        setDecrementPage(state) {
            state.pag -= 1;
        }
    },
    actions: {
        // GET PLAYERS LIST
        async getPlayers({ commit }) {
            try {
                const res = await fetch('https://raw.githubusercontent.com/GermanRodrickson/gnomeregan/main/data.json');
                const data = await res.json();
                commit('setLoading', false);
                commit('setPlayers', data.Gnomeregan);
            } catch (error) {
                console.log(error);
            }
        },
        // SEARCH
        filterName({ commit, state }, text) {
            const customerText = text.toLowerCase();
            const filter = state.players.filter(players => {
                const textApi = JSON.stringify(players).toLowerCase();
                if (textApi.includes(customerText)) {
                    return players;
                }
            });
            commit('setPlayersFilter', filter);
        },
    },
    getters: {
        loading(state) {
            return state.loading;
        },
        listPlayers(state) {
            return state.playersFilter;
        },
        pagination(state) {
            return state.pag;
        },
        limitPagination(state) {
            return state.num_results;
        }
    },
    modules: {}
});