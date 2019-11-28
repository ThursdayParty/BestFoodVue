<template>
    <div class="questiondetail">
        <table class="content_table">
            <tr>
                <th>제목</th>
                <td v-if="updatable">
                    <b-form-input v-model="updateQuestion.title"></b-form-input>
                </td>
                <td v-else style="width:30%;">{{question.title}}</td>
            
                <th>조회수</th>
                <td>{{question.views}}</td>
            </tr>
            <tr>
                <th>글쓴이</th>
                <td>{{question.userName}}</td>
            
                <th>작성일</th>
                <td v-cloak>{{question.createdTime | dateFormat}}</td>
            </tr>
            <tr style="height: 100%;">
                <th>내용</th>
                <td colspan="3" v-if="updatable">
                    <b-form-textarea type="text" v-model="updateQuestion.content"></b-form-textarea>
                </td>
                <td colspan="3" v-else>{{question.content}}</td>
            </tr>
        </table>

        <div class="qna_btns" v-if="question.updatable">
            <b-button v-if="!updatable" variant="outline-secondary" size="sm" style="margin-right: 8px" @click="updatable=true">수정</b-button>  
            <div v-else>
                <b-button variant="outline-secondary" size="sm" style="margin-right: 8px" @click="updateBoard">수정</b-button>  
                <b-button variant="outline-secondary" size="sm" @click="deleteBoard">삭제</b-button>
            </div>
        </div>

        <!-- <div class="qna_answers">
            <div class="qna_ans_write">
                댓글쓰기
            </div>

            <div class="qna_ans_list">
                이미 있는 댓글들
            </div>
        </div>

        {{msg}} -->
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
            updateQuestion: {},
            msg: '',
        }
    },
    mounted() {
        this.boardId = this.$route.params.boardId
        this.selectQuestionById()
    },
    computed: {
      isWritedUser() {
        // return this.$store.getters.getUserName === this.question.userName   // userId -> userName
        return this.$store.getters.isAuthenticated
      }, 
    },
    methods: {
        selectQuestionById() {
            http.get("/qnaBoards/" + this.boardId)
                .then(res => {
                    this.question = res.data
                    this.updateQuestion.title = res.data.title
                    this.updateQuestion.content = res.data.content
                })
                .then(() => this.msg = this.question)
        },
        updateBoard() {
            http.put(`/qnaBoards/${this.boardId}`, this.updateQuestion)
                .then(() => this.$router.push("/qnaboard"))
        },
        deleteBoard() {
            http.delete(`/qnaBoards/${this.boardId}`)
                .then(() => this.$router.push("/qnaboard"))
        },
    },
    filters: {
        dateFormat: function(date) {
            if(date===undefined) return ''
            var dateStr = date+" "
            return dateStr.substr(0,10);
        }
    }
}
</script>

<style>        
[v-cloak] {
    display: none
}

.questiondetail {
    padding: 30px;
}

.qna_btns {
    text-align: right;
    margin-top: 8px;
    font-family: 'Jua';
}
</style>