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
          <b-button variant="outline-info" @click="goSignup">회원가입</b-button><br>
          <b-button variant="outline-dark" @click="goGmailLogin" style="margin-top: 3px; width: 150px;">
              <img :src="googleLogo" style="width:25%; padding-right:7%;">gmail로 로그인
          </b-button>
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
      msg: '',
      googleLogo: require('../../assets/googleLogo.png')
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
    },
    goGmailLogin() {
      this.$gAuth.signIn()
          .then(GoogleUser => {
            let requestDto = {
              id: GoogleUser.El,
              socialType: GoogleUser.Zi.idpId,
              email: GoogleUser.w3.U3,
              name: GoogleUser.w3.ig
            }
            this.$store.dispatch('SOCIAL_LOGIN', requestDto)
                      .then(() => this.redirect())
          })  
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