<template>
    <div id="takefood">
        <div class="take_chart">
            <line-chart :chart-data="datacollection" :options="options" ></line-chart>
        </div>

        <div class="take_list">
            <table class="list_table">
                <tr>
                    <th>섭취날짜</th>
                    <th>섭취식품</th>
                    <th>제조사</th>
                    <th>칼로리</th>
                </tr>
                <tr v-for="food in selected" :key="food.takenDateTime">
                    <td>{{food.takenDateTime | dateFormat}}</td>
                    <td>{{food.name}}</td>
                    <td>{{food.maker}}</td>
                    <td>{{food.kcal}}</td>
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
.take_chart {
    padding: 30px
}

.take_list {
    padding: 30px
}

</style>