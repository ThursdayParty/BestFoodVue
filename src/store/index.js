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
        accessToken: null
    },
    getters: {
        isAuthenticated (state) {
            state.accessToken = state.accessToken || localStorage.accessToken
            return !!state.accessToken
        }
    },
    mutations: {
        LOGIN(state, {access_token}) {
            state.accessToken = access_token
            localStorage.accessToken = access_token
            http.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        },
        LOGOUT (state) {
            state.accessToken = null
            delete localStorage.accessToken
        }
    },
    actions: {
        LOGIN ({commit}, {email, password}) {

            const params = new URLSearchParams();
            params.append('grant_type', 'password')
            params.append('username', email)
            params.append('password', password)
            
            return auth.post('http://80d98152.ngrok.io/oauth/token', params, {
                            headers: {
                                'content-type' : 'application/x-www-form-urlencoded',
                                'Authorization': 'Basic YmFjdG9yaWE6cGFzc3dvcmQh'
                            }
                        })
                        .then(({data}) => {
                            commit('LOGIN', data)
                        })
        },
        LOGOUT ({commit}) {
            http.defaults.headers.common['Authorization'] = undefined
            commit('LOGOUT')
        },
    }
})