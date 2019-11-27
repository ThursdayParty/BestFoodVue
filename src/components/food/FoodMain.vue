<template>
    <div id="foodmain" class="main-container">
        <ImageSlider></ImageSlider>

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
            foods: {}
        }
    },
    mounted() {
        this.selectAllFood()
    },
    methods: {
        selectAllFood() {
            http.get("/foods")
                .then(res => this.foods = res.data)
        },
    },
}
</script>