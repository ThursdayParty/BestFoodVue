<template>
    <div class="signup">
        <h3>회원정보수정</h3>
        <div class="signup-wrapper">
            <b-form @submit="onSubmit">
                <div v-if="!isSocialUser">
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
                </div>

                <b-form-group id="input-group-4" label="이름을 입력하세요 :" label-for="input-name">
                    <b-form-input
                            id="input-name"
                            v-model="userForm.name"
                            type="text"
                            required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-5" label="(선택) 본인의 알레르기를 선택해주세요 :" label-for="checkboxes">
                    <b-form-checkbox-group v-model="userForm.allergies" id="checkboxes" v-for="a in allergyList"
                                           :key="a">
                        <b-form-checkbox :value="a">{{a}}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>

                <div class="signup_btns">
                    <b-button type="submit" variant="primary">수정</b-button>
                </div>
            </b-form>
        </div>

        <notifications group="app" position="bottom left" class="myNotify"/>

    </div>
</template>

<script>
    import http from '../../http-common'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                allergyList: ["대두", "땅콩", "우유", "게", "새우", "참치", "연어", "쑥", "소고기", "닭고기", "돼지고기", "복숭아", "민들레", "계란흰자"],
                againPassword: '',
                userForm: {
                    name: '',
                    password: '',
                    allergies: []
                }
            }
        },
        created() {
            this.getCurrentUser()
        },
        computed: {
            ...mapState([
                'isSocialUser'
            ]),
            passValidation() {
                return this.userForm.password.length > 3 && this.userForm.password.length < 21
            },
            passAgainValidation() {
                return this.userForm.password !== '' && this.userForm.password === this.againPassword
            }
        },
        methods: {
            getCurrentUser() {
                http.get('/account/currentUser')
                    .then(({data}) => {
                        this.userForm.name = data.name
                        this.userForm.allergies = data.allergies
                    })
            },
            onSubmit(event) {
                event.preventDefault()
                http.put('/account', this.userForm)
                // .then(() => alert(JSON.stringify(this.userForm) + " : 회원정보수정이 완료되었습니다."))
                    .then(() => this.$router.push("/"))
            },
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