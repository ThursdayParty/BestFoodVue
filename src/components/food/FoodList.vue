<template>
    <div id="foodlist">
        
        <ImageSlider></ImageSlider>

        <b-container class='bv-example-row fluid'>
            <b-row>
                <b-col cols="8" align='left'>검색</b-col>
                <b-col cols="4" align='right'>정렬</b-col>
            </b-row>
        </b-container>
        
        <div class="food-wrapper" v-for="food in foods" :key="food.foodId">
            <div class="food-header">
                <div class="food-img">
                    <img :src="food.imageUrl"
                     style="height: 150px; display: block; margin: 20px auto;" />
                </div>
                <div class="food-btns">
                    <b-button pill variant="danger" size="sm" style="margin-right: 5px">추천</b-button>
                    <b-button pill variant="warning" size="sm" @click="addTakenFood(food.foodId)">섭취</b-button>                  
                </div>
            </div>
            <div class="food-body">
                <router-link :to="{name: 'fooddetail', params: {code: food.foodId}}">
                    <h3 style="font-family: Jua, sans-serif; display: inline-block;">
                        {{food.name}}
                    </h3> 
                    <span> - </span>
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
            foods: []
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
            http.post("/taken", {foodId})
                .then(() => alert('섭취하였습니다!'))
        }
    },
}
</script>

<style scoped>
.food-wrapper {
	display: flex;
	margin: 20px 0;
	border-radius: 12px;
    padding: 10px;
}

.food-wrapper>.food-img {
	flex: 1 1 0;
	margin: 0 20px;
}

.food-wrapper>.food-btns {
    margin: 0 20px;
}

.food-wrapper>.food-body {
	flex: 5 5 0;
}

</style>