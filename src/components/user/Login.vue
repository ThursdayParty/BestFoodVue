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

          <b-button type="submit" variant="info" style="margin-right: 8px;">로그인</b-button>
          <b-button variant="outline-info" @click="goSignup">회원가입</b-button>
      </form>
    </b-card>  
    <br>
    <div class="msgbox"><i>{{msg}}</i></div>
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
          .catch(() => {
            this.msg = '아이디 또는 비밀번호가 틀립니다.'            
          })
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
      },
      goSignup() {
        this.$router.push('/signup')
      }
    }
  }
</script>

<style scoped>
#login {
  width: 100%;
  text-align: center;
  padding: 120px 20px 120px;
  font-family: 'Jua'
}

.logincard {
  display: inline-block;
  width: 50%;
}

.msgbox {
  margin: 10px;
}
</style>