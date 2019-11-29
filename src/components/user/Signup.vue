<template>
    <div class="signup">
        <h3>회원가입</h3>
        <div class="signup-wrapper">
            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="아이디를 입력하세요 :" label-for="input-id">
                    <b-row>
                        <b-col cols="10" align='left'>
                            <b-form-input
                                id="input-id"
                                v-model="userForm.id"
                                type="text"
                                required
                            ></b-form-input>
                        </b-col>
                        <b-col cols="2" align='right'>
                            <b-button variant="outline-danger" size="sm" @click="checkDuplicationID">중복체크</b-button>
                        </b-col>
                    </b-row>
                </b-form-group>

                <b-form-group id="input-group-2" label="비밀번호를 입력하세요 :" label-for="input-pass">
                    <b-form-input
                        id="input-pass"
                        v-model="userForm.password"
                        type="password"
                        required                        
                    ></b-form-input>
                    <b-form-invalid-feedback :state="passValidation">
                        Your password must be 4-20 characters long, contain letters and numbers.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="passValidation">
                        Good.
                    </b-form-valid-feedback>
                </b-form-group>

                <b-form-group id="input-group-3" label="비밀번호 확인 :" label-for="input-pass">
                    <b-form-input
                        id="input-pass"
                        type="password"
                        required
                        v-model="againPassword"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="passAgainValidation">
                        It must be same password above.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="passAgainValidation">
                        Good.
                    </b-form-valid-feedback>
                </b-form-group>

                <b-form-group id="input-group-4" label="이름을 입력하세요 :" label-for="input-name">
                    <b-form-input
                        id="input-name"
                        v-model="userForm.name"
                        type="text"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-5" label="(선택) 본인의 알레르기를 선택해주세요 :" label-for="checkboxes">
                    <b-form-checkbox-group v-model="userForm.allergies" id="checkboxes" v-for="a in allergyList" :key="a">
                        <b-form-checkbox :value="a">{{a}}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>

                <div class="signup_btns">
                    <b-button type="submit" variant="primary">가입</b-button>
                </div>
            </b-form>
        </div>

        <notifications group="app" position="bottom left" class="myNotify"/>

    </div>
</template>

<script>
import http from '../../http-common'
export default {
    data() {
        return {
            // name: '',
            allergyList: ["대두","땅콩","우유","게","새우","참치","연어","쑥","소고기","닭고기","돼지고기","복숭아","민들레","계란흰자"],
            didCheckDuplicationId: false,
            againPassword: '',
            userForm: {
                id: '',
                password: '',
                name: '',
                allergies: []
            }
        }
    },
    computed: {
      passValidation() {
         return this.userForm.password.length > 3 && this.userForm.password.length < 21
      },
      passAgainValidation() {
        return this.userForm.password!=='' && this.userForm.password === this.againPassword
      }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            if(!this.didCheckDuplicationId) {
                this.$notify({
                    group: 'app',
                    type: 'error',
                    duration: 1000,
                    title: '중 복 체 크',
                    text: '중복체크를 해주세요.'
                })
            } 
            else if(!this.passValidation) {
                this.$notify({
                    group: 'app',
                    type: 'error',
                    duration: 1000,
                    title: '비 밀 번 호',
                    text: '비밀번호는 4자리 이상 20자 이하입니다.'
                })
            }
            else if(!this.passAgainValidation) {
                this.$notify({
                    group: 'app',
                    type: 'error',
                    duration: 1000,
                    title: '비 밀 번 호',
                    text: '비밀번호 확인에 동일하게 입력해주세요.'
                })
            }            
            else {
                http.post('/account/signup', this.userForm)
                    .then(() => alert("회원가입이 완료되었습니다."))
                    .then(() => this.$router.push("/login"))
            }
        },
        checkDuplicationID() {
            if(this.userForm.id === '') {
                this.$notify({
                    group: 'app',
                    type: 'error',
                    duration: 1000,
                    title: '중복체크',
                    text: '아이디를 입력하세요.'
                })
            } else {
                http.get(`/account/userIdDuplicationCheck?accountId=${this.userForm.id}`)
                    .then(() => {
                        this.$notify({
                            group: 'app',
                            type: 'success',
                            duration: 1000,
                            title: '중복체크',
                            text: '사용 가능한 아이디입니다.'
                        })
                        this.didCheckDuplicationId = true                    
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'app',
                            type: 'warn',
                            duration: 1000,
                            title: '중복체크',
                            text: '이미 있는 아이디입니다.'
                        })
                        this.didCheckDuplicationId = false
                    })
            }
        }
    },
}
</script>

<style scoped>
.signup h3 {
    margin-top: 30px;
    font-family: 'Jua'
}

.signup-wrapper {
    text-align: start;
    padding: 30px 120px;
}

.signup_btns {
    text-align: center
}

.myNotify {
    font-family: 'Jua';
}
</style>