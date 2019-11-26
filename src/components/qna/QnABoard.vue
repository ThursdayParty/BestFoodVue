<template>
    <div class="qnaboard">        
        <b-button variant="secondary" @click="questionwrite">글쓰기</b-button>
        <table class="list_table">
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
            </tr>

            <tr v-for="q in questions" :key="q.boardId">
                <td>{{q.boardId}}</td>
                <td><router-link :to="{name: 'questiondetail', params: {boardId: q.boardId}}">{{q.title}}</router-link></td>
                <td>{{q.userId}}</td>
                <td>{{q.createdTime | dateFormat}}</td>
                <td>{{q.views}}</td>
            </tr>
        </table>
    </div>
</template> 

<script>
import http from "../../http-common";
export default {
    name: 'qnaboard',
    data() {
        return {
            questions: []
        }
    },
    mounted() {
        this.selectAllQuestion()
    },
    updated() {
        this.selectAllQuestion()
    },
    methods: {
        selectAllQuestion() {
            http.get("/qnaBoards")
                .then(res => this.questions = res.data)
        },
        questionwrite() {
            this.$router.push('/questionwrite')
        }
    },
    filters: {
        dateFormat: function(date) {
            return date.substr(0,10);
        }
    }
}
</script>

<style scoped>

</style>