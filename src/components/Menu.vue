<template>
    <div id="menu">
        <b-nav tabs justified>
            <b-nav-item><router-link to="/">메인</router-link></b-nav-item>
            <b-nav-item><router-link to="/foodlist">상품정보</router-link></b-nav-item>
            <b-nav-item><router-link to="/takefood">섭취한 식품</router-link></b-nav-item>
            <b-nav-item><router-link to="/qnaboard">QnA게시판</router-link></b-nav-item>
        </b-nav>
    </div> 
</template>

<script>
export default {
    name: 'menu'
}
</script>

<style scoped>
#menu {
    font-family: 'Jua';
}
</style>