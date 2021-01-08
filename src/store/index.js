import { createStore } from 'vuex';

export default createStore({
    state: {
        players: [],
        playersFilter: [],
        loading: true
    },
    mutations: {
        setPlayers(state, payload) {
            state.players = payload;
        },
        setPlayersFilter(state, payload) {
            state.playersFilter = payload;
        }
    },
    actions: {
        // GET PLAYERS LIST
        async getPlayers({ commit }) {
            try {
                const res = await fetch('https://raw.githubusercontent.com/GermanRodrickson/gnomeregan/main/data.json');
                const data = await res.json();
                commit('setPlayers', data);
            } catch (error) {
                console.log(error);
            } finally {
                () => this.loading = false
            }
        },

        // SEARCH
        filterName({ commit, state }, text) {
            const customerText = text.toLowerCase();
            const filter = state.players.filter(players => {
                const textApi = players.name.toLowerCase();
                if (textApi.includes(customerText)) {
                    return players;
                }
            });
            commit('setPlayersFilter', filter);
        }
    },
    getters: {
        listPlayers(state) {
            return state.players.Gnomeregan;
        }
    },
    modules: {}
});