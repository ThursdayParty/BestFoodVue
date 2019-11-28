<template>
    <div id="takefood">
        <div class="take_chart">
            <line-chart :chart-data="datacollection" :options="options" ></line-chart>
        </div>

        <div class="take_list">
            <div id="currentDate">{{localDateTitle}}</div>
            <table class="list_table">
                <tr>
                    <th style="width:22%">섭취 시간</th>
                    <th>섭취 식품</th>
                    <th>제조사</th>
                    <th>칼로리</th>
                    <th>삭제</th>
                </tr>
                <tr v-for="food in selected" :key="food.takenDateTime">
                    <td>
                        <b-badge variant="info" style="margin-right: 2px">
                        {{food.takenDateTime | timeBadge}}
                        </b-badge>
                        {{food.takenDateTime | timeFormat}}
                    </td>
                    <td>
                        <router-link :to="{name: 'fooddetail', params: {code: food.foodId}}">
                            {{food.name}}
                        </router-link>
                        <span v-for="a in food.allergiesWithUser" :key="a">
                            <b-badge variant="danger" style="margin-right: 2px">{{a}}</b-badge>
                        </span>                        
                    </td>
                    <td>{{food.maker}}</td>
                    <td>{{food.kcal}}</td>
                    <td>
                        <b-button variant="warning" size="sm" @click="deleteTakenFood(food.takenFoodId)">삭제</b-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import http from "../../http-common";
import LineChart from './LineChart.js'
export default {
    name: "takefood",
    components: {
      LineChart
    },
    data() {
        return {
            selected: [],
            takenFood: [],
            datacollection: null,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [ {
                        gridLines: {
                            display: false
                        }
                    }]
                },
                responsive: true, 
                maintainAspectRatio: false, 
                onClick: this.chartClick,
            },
            localDateTitle: '',
        }
    },
    beforeMount() {
        this.selectTakenAllFood()
    },
    methods: {
        selectTakenAllFood() {
            http.get('/taken/daily')
                .then(res => this.takenFood = res.data)
                .then(() => {
                    this.fillData()
                    this.selected = this.takenFood[9].foods
                    this.localDateTitle = this.takenFood[9].localDate
                })
        },
        fillData () {
            this.datacollection = {
                labels: this.takenFood.map(x => x.localDate),
                datasets: [{
                    label: '총칼로리',
                    borderWidth: 1,
                    fill: false,
                    backgroundColor: '',
                    pointBackgroundColor: '#84AC67',
                    borderColor: '#84AC67',
                    pointBorderColor: '#84AC67',
    
                    data: this.takenFood.map(x => x.kcal)
                }],
            }
        },
        chartClick(point, event) {
            const idx = event[0]._index
            this.selected = this.takenFood[idx].foods
            this.localDateTitle = this.takenFood[idx].localDate
        },
        deleteTakenFood(id) {
            if(confirm("삭제하시겠습니까?")){
                http.delete(`/taken/${id}`)
                    .then(() => this.selectTakenAllFood())
            }
        }
    },
    filters: {
        timeBadge: function(date) {    
            return date.split('T')[1].substr(0,2) < 12 ? '오전' : '오후'
        },
        timeFormat: function(date) {    
            // 2019-11-26T09:38:35.43937

            var dateStr = date+" "
            const dateArr = dateStr.split('T')
            const timeArr = dateArr[1].substr(0, 8).split(':')

//            const hour = timeArr[0] < 12 ? `오전 ${timeArr[0]}시` : `오후 ${timeArr[0]%12}시 `
            const hour = `${timeArr[0] % 12}시`
            const minute = `${timeArr[1]}분 `
            const second = `${timeArr[2]}초`

            const result = hour + minute + second

            return result;
        },
        allergyFormat: function(arr) {
            return arr.join(" ");
        }
    }
}
</script>

<style scoped>
.take_chart {
    padding: 30px
}

.take_list {
    padding: 30px
}

#currentDate {
    text-align: left;
    padding-left: 10px;
    padding-bottom: 10px;
    font-family: 'Jua';
    font-size: 1.5em;
}
</style>