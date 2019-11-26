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

<style scoped>
.content_table {
  width: 98%;
  border-bottom: 1px solid #EFEFEF;
  border-right: 1px solid #EFEFEF;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  clear: both;
}

.content_table td,
.content_table th {
  text-align: center;
  border-top: 1px solid #EFEFEF;
  border-left: 1px solid #EFEFEF;
  padding: 0.3em;
}

.content_table th {
  background-color: rgb(129, 143, 175);
  color: #FFFFFF;
  line-height: 1.7em;
  font-weight: normal;
}

.content_table td {
  padding-left: 5px;
  text-align: left;
  line-height: 1.7em;
}

.content_table td.contents {
  width: 100%;
  height: 400px;
  overflow: auto;
}

.content_table th,
.content_table td {
  vertical-align: middle;
}

.content_table select {
  height: 19px;
  border: #CCCCCC solid 1px;
  vertical-align: middle;
  line-height: 1.8em;
  padding-left: 0px;
}

.content_table select option {
  margin-right: 10px;
}

.search_box {
  width: 98%;
  border-width: 1px;
  border-style: solid;
  border-color: #EFEFEF;
  background-color: #FFFFFF;
  padding: 2px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 2.1em;
}
</style>