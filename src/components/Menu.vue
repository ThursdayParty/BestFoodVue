<template>
    <div id="menu">
        <b-nav tabs justified>
            <b-nav-item @click="routeTo('/')">메인</b-nav-item>
            <b-nav-item @click="routeTo('/foodlist')">상품정보</b-nav-item>
            <b-nav-item @click="routeTo('/takefood')"><router-link to="/takefood">섭취한 식품</router-link></b-nav-item>
            <b-nav-item @click="routeTo('/qnaboard')"><router-link to="/qnaboard">QnA게시판</router-link></b-nav-item>
        </b-nav>
    </div> 
</template>

<script>
export default {
    name: 'menu',
    methods: {
        routeTo(path) {
            this.$router.push(path)
        }
    }
}
</script>

<style scoped>
#menu {
    font-family: 'Jua';
}
</style>