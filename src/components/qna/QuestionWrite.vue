<template>
    <div class="questionwrite">
        <form action="#" method="post">
            <table class="content_table">
                <tr>
                    <th>글제목</th>
                    <td>
                        <b-form-input v-model="question.title"></b-form-input>
                    </td>
                </tr>
                <tr style="height: 100%">
                    <th>내용</th>
                    <td>
                        <b-form-textarea v-model="question.content"></b-form-textarea>
                    </td>
                </tr>
            </table>

            <div class="qna_btns">
                <b-button variant="outline-secondary" size="sm" style="margin-right: 8px" @click="submit">등록</b-button>  
            </div>
        </form>
    </div>
</template>

<script>
import http from "../../http-common";
export default {
    name: 'questionwrite',
    data() {
        return {
            question: {}
        }
    },
    methods: {
        submit() {
            http.post("/qnaBoards", this.question)
                .then(() => this.$router.push("/qnaboard"))
        }
    },
}
</script>

<style scoped>
.questionwrite {
    padding: 60px;
}
.qna_btns {
    text-align: right;
    margin-top: 8px;
    font-family: 'Jua';
}
</style>