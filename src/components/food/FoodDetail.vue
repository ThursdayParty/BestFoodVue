<template>
    <div id="fooddetail">

        <div class="container-fluid" style="background-color: #fff; margin: 20px 0; border-radius: 12px; font-size: 1.3em; font-family: Jua, sans-serif;">
            <div class="col-xs-2 col-xs-offset-2">
                <img :src="food.imageUrl" style="height: 300px; display: block; margin: 20px auto;" />
            </div>
            <div class="col-xs-5 col-xs-offset-1">
                <div class="col-xs-12" style="border-top: 1px solid #eee; height: 1px; margin: 7px 0"></div>
                <div class="col-xs-2">제품명</div>
                <div class="col-xs-10" style="font-family: Jua, sans-serif;">
                    {{food.name}}                
                    <!-- <c:if test="${!empty userid}">
                        <button onclick="takeFood()">섭취</button>
                    </c:if> -->
                </div>
                <div class="col-xs-12" style="border-top: 1px solid #eee; height: 1px; margin: 7px 0"></div>
                <div class="col-xs-2">제조사</div>
                <div class="col-xs-10" style="font-family: Jua, sans-serif;">
                    {{food.maker}}
                </div>

                <div class="col-xs-12" style="border-top: 1px solid #eee; height: 1px; margin: 7px 0"></div>
                <div class="col-xs-2">원재료</div>
                <div class="col-xs-10">
                    {{food.materials}}
                </div>

                <div class="col-xs-12" style="border-top: 1px solid #eee; height: 1px; margin: 7px 0"></div>
                <div class="col-xs-2">조회수</div>
                <div class="col-xs-10">
                    {{food.views}}
                </div>
                <div class="col-xs-12"
                    style="border-top: 1px solid #eee; height: 1px; margin: 7px 0"></div>
                <div class="col-xs-2">알레르기 성분</div>
                <div class="col-xs-10">
                    {{alergies}}
                </div>
            </div>
        </div>

        <div>
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
                        this.food.carbohydrate, this.food.protein,
                        this.food.fat, this.food.sugars, this.food.salt, this.food.cholesterol,
                        this.food.saturatedFattyAcid, this.food.transFat
                    ],
                }],
            }
      },
    },
}
</script>