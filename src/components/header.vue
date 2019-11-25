<template>
    <div id="header">
        <b-container class='bv-example-row fluid'>
            <b-row>
                <b-col cols="8"><h1>SAFEFOOD</h1></b-col>
                <b-col cols="4">
                    <!-- 로그인 후 -->
                    <div v-if="isAuthenticated">
                        {{userId}}님 |
                        <a href="" @click.prevent="onClickLogout">로그아웃</a> | 
                        <router-link to='/updateUserInfo'>회원정보수정</router-link>
                    </div>
                    <!-- 로그인 전 -->
                    <div v-else>
                        <router-link to="/login">로그인</router-link> | 
                        <router-link to="/signup">회원가입</router-link>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
// import http from "../http-common";
import store from '../store'
export default {
    name: "header",
    data() {
        return {
            userId: ""
        }
    },
    // created() {
    //     http.get('/home')
    //         .then(result => this.userId = result.data.userId)
    // },
    computed: {
      isAuthenticated() {
        return store.getters.isAuthenticated
      }
    },
    methods: {
      onClickLogout() {
        store.dispatch('LOGOUT')
            .then(() => this.$router.push('/'))
      }
    }
}
</script>

<style scoped>
#header {
    font-family: 'Jua';
}
</style>