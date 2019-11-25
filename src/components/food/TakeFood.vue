<template>
    <div id="takefood">
        <div>
            그래프 영역
        </div>

        <table>
            <tr>
                <th>섭취날짜</th>
                <th>섭취식품</th>
            </tr>
            <tr v-for="item in takenFood" :key="item">
                <td>{{item.takenDateTime}}</td>
                <td>{{item.food.name}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import http from "../../http-common";
export default {
    name: "takefood",
    data() {
        return {
            takenFood: []   // takenDateTime, food
        }
    },
    mounted() {
        this.selectTakenAllFood()
    },
    methods: {
        selectTakenAllFood() {
            http.get('/taken')
                .then(res => this.takenFood = res.data)    
        }
    },
}
</script>