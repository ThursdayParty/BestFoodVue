<template>
    <div id="foodlist">
        
        <ImageSlider></ImageSlider>

        <div class="food-wrapper" v-for="food in foods" :key="food.foodId">
            <div class="food-img">
                <img :src="food.imageUrl"
                     style="height: 150px; display: block; margin: 20px auto;" />
            </div>

            <button @click="addTakenFood(food.foodId)"></button>

            <div class="food-body">
                <router-link :to="{name: 'fooddetail', params: {code: food.foodId}}">
                    <h1 style="font-family: Jua, sans-serif; display: inline-block;">
                        {{food.name}}
                    </h1> 
                    <span>-</span>
                    <h5 style="font-family: Jua, sans-serif;display: inline-block;">
                        {{food.maker}}
                    </h5> 
                    <div>
                        {{food.materials}}
                    </div>
                </router-link>
            </div>
        </div> 
    </div>
</template>

<script>
import http from "../../http-common";
import ImageSlider from '../ImageSlider'
export default {
    name: 'foodlist',
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
        addTakenFood(foodId) {
            http.post("/taken", foodId)
                .then(() => alert('섭취 완료'))
        }
    },
}
</script>

<style scoped>
.food-wrapper {
	display: flex;
	background-color: #fff;
	margin: 20px 0;
	border-radius: 12px;
}

.food-wrapper>.food-img {
	flex: 1 1 0;
	margin: 0 20px;
}

.food-wrapper>.food-body {
	flex: 5 5 0;
}
</style>