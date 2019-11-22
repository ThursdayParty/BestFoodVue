import Vue from 'vue'
import Vuex from 'vuex'
import http from "../http-common";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: null
    },
    mutations: {
        LOGIN(state, {accessToken}) {
            state.accessToken = accessToken
        },
        LOGOUT(state) {
            state.accessToken = null
        }
    },
    actions: {
        LOGIN({commit}, {id, password}) {
            return http.post("/login", {id, password})
                       .then(({data}) => commit('LOGIN', data))
        },
        LOGOUT({commit}) {
            commit('LOGOUT')
        }
    }
})