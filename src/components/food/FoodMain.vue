<template>
    <div id="foodmain" class="main-container">

        <ImageSlider></ImageSlider>

        <h3>인기 상품 TOP 5</h3>

        <div class="recommand_ranking">
            <b-card-group deck>
                <b-card v-for="(val, idx) in top5" :key="idx" 
                    border-variant="success" 
                    align="center" 
                    :img-src="val.imageUrl" >
                    <b-card-text>
                        <b-badge variant="success" style="margin-right: 2px">{{idx+1}}등</b-badge>
                        <router-link :to="{name: 'fooddetail', params: {code: val.foodId}}" style="font-family: 'Jua'">
                            {{val.name}}
                        </router-link>
                    </b-card-text>
                </b-card>
            </b-card-group>
        </div>

        <hr>
        <h3>전체 상품</h3>

        <div class="container">
			<div class="row">
				<div class="main col-12">
					<div class="isotope-container row grid-space-10">

        <div v-for="food in foods" :key="food.foodId"
             class="col-lg-4 col-md-6 isotope-item app-development">
            
            <div class="image-box hc-shadow-2 text-center mb-20">
                <div class="overlay-container">
                    <img :src="food.imageUrl" width='200' class="center">
                    <div class="overlay-top">
                        <div class="text">
                            <h5 style="font-family: 'Jua'">
                                <router-link :to="{name: 'fooddetail', params: {code: food.foodId}}">
                                    {{food.name}}
                                </router-link>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                    </div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import http from "../../http-common";
import ImageSlider from '../ImageSlider'
export default {
    name: 'foodmain',
    components: {
        ImageSlider
    },
    data() {
        return {
            foods: {},
            top5: [],
            msg: '',
        }
    },
    mounted() {
        this.selectAllFood()
    },
    methods: {
        selectAllFood() {
            http.get("/foods")
                .then(({data}) => this.foods = data)
                .then(() => this.top5 = this.getTop5())
        },
        getTop5() {
            const foodList = this.foods
            foodList.sort(function(a, b) {
                return a.recommendCount < b.recommendCount ? 1 : a.recommendCount > b.recommendCount ? -1 : 0;
            })
            this.msg = foodList.slice(0, 5).map(x=>x.name)
            return foodList.slice(0, 5)
        }
    },
}
</script>

<style scoped>
.recommand_ranking {
    margin: 8px;
    padding: 8px;    
}

.main-container h3 {
    margin-top: 30px;
    font-family: 'Jua'
}
</style>