<template>
    <div id="header">
        <b-container class='bv-example-row fluid'>
            <b-row>
                <b-col cols="8" align='left'><h1 style="color: #ED5B46">BESTFOOD</h1></b-col>
                <b-col cols="4" align='right'>
                    <!-- 로그인 후 -->
                    <div v-if="isAuthenticated">
                        {{userName}}님 |
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
export default {
    name: "header",
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated
      },
      userName() {
        return this.$store.getters.getUserName
      } 
    },
    methods: {
      onClickLogout() {
        this.$store.dispatch('LOGOUT')
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