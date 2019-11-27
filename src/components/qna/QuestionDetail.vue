<style>        
    [v-cloak] {
        display: none
    }
</style>

<template>

    <div class="questiondetail">
        <table class="content_table">
            <tr>
                <th>제목</th>
                <td v-if="updatable"><input type="text" v-model="updateQuestion.title"></td>
                <td v-else>{{question.title}}</td>
            </tr>
            <tr>
                <th>조회수</th>
                <td>{{question.views}}</td>
            </tr>
            <tr>
                <th>글쓴이</th>
                <td>{{question.userId}}</td>
            </tr>
            <tr>
                <th>작성일</th>
                <td v-cloak>{{question.createdTime | dateFormat}}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td v-if="updatable"><input type="text" v-model="updateQuestion.content"></td>
                <td v-else>{{question.content}}</td>
            </tr>
        </table>

        <button v-if="!updatable" @click="isValidPassword">수정하기</button>
        <div v-else>
            <button @click="updateBoard">수정</button>  
            <button @click="deleteBoard">삭제</button>  
        </div>
    </div>
</template>

<script>
import http from "../../http-common";
export default {
    name: 'questiondetail',
    data() {
        return {
            updatable: false,
            boardId: "",
            question: {},
            updateQuestion: {}
        }
    },
    mounted() {
        this.boardId = this.$route.params.boardId
        this.selectQuestionById()
    },
    methods: {
        selectQuestionById() {
            http.get("/qnaBoards/" + this.boardId)
                .then(res => {
                    this.question = res.data
                    this.updateQuestion.title = res.data.title
                    this.updateQuestion.content = res.data.content
                })
        },
        isValidPassword() {
            var inputPw = prompt('비밀번호를 입력하세요.', '')
            http.get(`/qnaBoards/${this.boardId}/password?boardPassword=${inputPw}`)
                .then(res => this.updatable = res.data.updatable)
        },
        updateBoard() {
            http.put(`/qnaBoards/${this.boardId}`, this.updateQuestion)
            this.$router.push("/qnaboard")
        },
        deleteBoard() {
            http.delete(`/qnaBoards/${this.boardId}`)
            this.$router.push("/qnaboard")
        },
    },
    filters: {
        dateFormat: function(date) {
            if(date === undefined) {
                return ""
            }
            var dateStr = date+" "
            return dateStr.substr(0,10);
        }
    }
}
</script>