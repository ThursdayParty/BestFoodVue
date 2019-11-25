<template>
  <div id='login'>

  <b-card class='logincard' bg-variant="light">
    <form @submit.prevent="onSubmit(email, password)">
        <b-form-group
          label-cols-sm="3"
          label="Id :"
          label-size="sm"
          label-align-sm="right"
          label-for="nested-id"
        >
          <b-form-input id="nested-id" size="sm" v-model="email" ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="Password :"
          label-size="sm"
          label-align-sm="right"
          label-for="nested-password"
        >
          <b-form-input type='password' id="nested-password" size="sm" v-model="password"></b-form-input>
        </b-form-group>

        <b-button type="submit" pill variant="info">로그인</b-button>
    </form>
  </b-card>

    <p><i>{{msg}}</i></p>



  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        msg: ''
      }
    },
    methods: {
      onSubmit(email, password) {
        this.$store.dispatch('LOGIN', {email, password})
          .then(() => this.redirect())
          .catch(({message}) => this.msg = message)
      },
      redirect() {
        const {search} = window.location
        if(search===''){
              this.$router.push('/')
        }

        const tokens = search.replace(/^\?/, '').split('&')
        const {returnPath} = tokens.reduce((qs, tkn) => {
          const pair = tkn.split('=')
          qs[pair[0]] = decodeURIComponent(pair[1])
          return qs
        }, {})

        this.$router.push(returnPath)
      }
    }
  }
</script>

<style scoped>
#login {
  width: 100%;
  text-align: center;
  padding: 20px
}
.logincard {
  display: inline-block;
  width: 50%;
}
</style>