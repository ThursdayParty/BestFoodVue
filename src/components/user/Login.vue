<template>
    <div id="login">
        <form method="post" @submit.prevent="submit(id, password)">
            <input type="text" placeholder="id" v-model="id"><br>
            <input type="password" placeholder="password" v-model="password"><br>
            <input type="submit" value="login">
        </form>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            id: '',
            password: '',
            msg: ''
        }
    },
    methods: {
        submit(id, password) {
            alert(id, password)
            // this.$store.dispatch('LOGIN', {id, password})   // 로그인 액션 실행 -> 액션은 dispatch()함수로 실행
            //     .then(() => this.redirect())
            //     .catch(({message}) => this.msg = message)
        },
        /* redirect() {
            const {search} = window.location
            const tokens = search.replace(/^\?/, '').split('&')
            const {returnPath} = tokens.reduce((qs, tkn) => {
                const pair = tkn.split('=')
                qs[pair[0]] = decodeURIComponent(pair[1])
                return qs
            }, {})

            this.$router.push(returnPath)
        }
 */
    },
}
</script>