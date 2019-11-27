import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http-common'
import auth from 'axios'

Vue.use(Vuex)

const enhanceAccessToken = () => {
    const {accessToken} = localStorage
    if (!accessToken) return
    http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
enhanceAccessToken()

export default new Vuex.Store({
    state: {
        accessToken: null,
        foods: [],
        userName: '',
    },
    getters: {
        isAuthenticated(state) {
            state.accessToken = state.accessToken || localStorage.accessToken
            return !!state.accessToken
        },
        getFoods(state) {
            return state.foods
        },
        getFoodsSortByName(state) {
            const foods = [...state.foods].sort((a, b) => {
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            })
            return foods
        },
        getFoodsSortByMaker(state) {
            const foods = [...state.foods].sort((a, b) => {
                if(a.maker > b.maker) return 1
                if(a.maker < b.maker) return -1
                return 0
            })
            return foods
        },
        getUserName(state) {
            return state.userName
        }
        /* getFoodsSortByName(state) {
            const list = state.foods
            alert("name : " + JSON.stringify(state.foods))
            return list.sort(function(a, b) {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            })
        },
        getFoodsSortByMaker(state) {
            const list = state.foods
            alert("maker : " + JSON.stringify(state.foods))
            return list.sort(function(a, b) {
                return a.maker < b.maker ? -1 : a.maker > b.maker ? 1 : 0;
            })
        }, */
    },
    mutations: {
        LOGIN(state, {access_token}) {
            state.accessToken = access_token
            localStorage.accessToken = access_token
            http.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        },
        LOGOUT(state) {
            state.accessToken = null
            delete localStorage.accessToken
        },
        ALLFOOD(state, foods) {
            state.foods = foods
        },
        USERNAME(state, name) {
            state.userName = name
        }
    },
    actions: {
        LOGIN ({commit}, {email, password}) {

            const params = new URLSearchParams();
            params.append('grant_type', 'password')
            params.append('username', email)
            params.append('password', password)
            
            return auth.post('http://68dcb0fc.ngrok.io/oauth/token', params, {
                            headers: {
                                'content-type' : 'application/x-www-form-urlencoded',
                                'Authorization': 'Basic YmFjdG9yaWE6cGFzc3dvcmQh'
                            }
                        })
                        .then(({data}) => commit('LOGIN', data))
                        .then(() => {
                            http.get('/account/currentUser')
                                .then(({data}) => commit('USERNAME', data.name))
                        })
        },
        LOGOUT ({commit}) {
            http.defaults.headers.common['Authorization'] = undefined
            commit('LOGOUT')
        },
        ALLFOOD ({commit}) {
            return http.get('/foods')
                        .then(({data}) => commit('ALLFOOD', data))
        }
    }
})