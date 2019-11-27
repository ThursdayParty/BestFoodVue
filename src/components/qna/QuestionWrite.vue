<template>
    <div class="questionwrite">
        <form action="#" method="post">
            <table class="content_table">
                <tr>
                    <th>글제목</th>
                    <td><input type="text" v-model="question.title"></td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td><input type="text" v-model="question.content"></td>
                </tr>
            </table>

            <button @click="submit">등록</button>
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
                // .then(() => this.$router.push("/qnaboard"))
            this.$router.push("/qnaboard")
        }
    },
}
</script>