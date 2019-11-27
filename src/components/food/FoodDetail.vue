<template>
    <div id="fooddetail">

        <b-container class='bv-example-row fluid'>
            <div class="food-wrapper">
                <b-row>
                    <b-col cols="4" align='center' >
                        <div class="food-img">
                            <img :src="food.imageUrl" style="height: 150px; margin: 30px auto;" />
                        </div>
                    </b-col>
                    <b-col cols="8" align='center'>
                        <div class="food-info">
                            <table class="content_table">
                                <tr>
                                    <th>제품명</th>
                                    <td>{{food.name}}</td>
                                </tr>
                                <tr>
                                    <th>제조사</th>
                                    <td>{{food.maker}}</td>
                                </tr>
                                <tr>
                                    <th>원재료</th>
                                    <td>{{food.materials}}</td>
                                </tr>
                                <tr>
                                    <th>조회수</th>
                                    <td>{{food.views}}</td>
                                </tr>
                                <tr>
                                    <th>알러지 성분</th>                                    
                                    <td v-if="$options.filters.allergyFormat(alergies)">{{alergies | allergyFormat}}</td>
                                    <td v-else>해당하는 알러지 성분이 없습니다.</td>
                                </tr>
                                <tr>
                                    <th>추천</th>
                                    <td>{{food.recommendCount}}</td>
                                </tr>
                            </table>  
                        </div>                  
                    </b-col>
                </b-row>
            </div>
        </b-container>

        <div class="food-chart">
            <pie-chart :chart-data="datacollection" :options="options" ></pie-chart>
        </div>
    </div>
</template>

<script>
import http from "../../http-common";
import PieChart from './PieChart.js'
export default {
    name: 'fooddetail',
    components: {
      PieChart
    },
    data() {
        return {
            code: "",
            food: {},
            alergies: [],
            options: {responsive: true, maintainAspectRatio: false},
            datacollection: null
        }
    },
    mounted() {
        this.code = this.$route.params.code
        this.selectFoodBycode()
    },
    methods: {
        selectFoodBycode() {
            http.get("/foods/" + this.code)
                .then(res => {
                    this.food = res.data
                    this.alergies = res.data.alergies
                })
                .then(() => this.fillData())
        },
        fillData () {
            this.datacollection = {
                labels: [ '탄수화물', '단백질', '지방', '당류', '나트륨', '콜레스테롤',
                        '포화지방산', '트랜스지방' ],
                datasets: [{
                    label: 'Data One',
                    backgroundColor: [ "#2ecc71", "#3498db", "#95a5a6", "#9b59b6",
                            "#f1c40f", "#e74c3c", "#34495e", '#00968896' ],
                    data: [
                        this.food.carbohydrate, this.food.protein, this.food.fat, 
                        this.food.sugars, this.food.salt, this.food.cholesterol,
                        this.food.saturatedFattyAcid, this.food.transFat
                    ],
                }],
            }
        },
    },
    filters: {
        allergyFormat: function(arr) {
            return arr.join(" ");
        }
    },
}
</script>

<style scoped>
.food-wrapper {
    /* background-color: antiquewhite */
    padding: 30px;
}

.food-img {
    margin-top: 40px;
}

.food-chart {
    padding: 40px;
}
</style>