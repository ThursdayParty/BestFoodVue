<template>
    <div id="foodlist">
        
        <notifications group="app" position="bottom center" class="myNotify"/>
        <ImageSlider></ImageSlider>

        <b-container class='bv-example-row fluid'>
            <b-row>
                <b-col cols="8" align='left'>
                    <!-- <select v-model="searchType">
                        <option value="name">이름</option>
                        <option value="maker">제조사</option>
                        <option value="materials">재료</option>
                    </select> -->
                    <b-form-select v-model="searchType" :options="options"></b-form-select>
                    <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요">
                    <button @click="search">검색</button>          
                </b-col>
                <b-col cols="4" align='right'>
                    정렬
                    <select v-model="sortingType" @change="sorting($event)">
                        <option disabled value="">선택하세요</option>
                        <option value="name">이름순</option>
                        <option value="maker">제조사순</option>
                        <option value="">추천순</option>
                    </select>
                </b-col>
            </b-row>
        </b-container>
        
        <div class="food-wrapper" v-for="food in foods" :key="food.foodId">
           <!--  <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                    <b-col md="6">
                        <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-body title="Horizontal Card">
                        <b-card-text>
                            This is a wider card with supporting text as a natural lead-in to additional content.
                            This content is a little bit longer.
                        </b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card> -->

            <div class="food-header">
                <div class="food-img">
                    <img :src="food.imageUrl"
                     style="height: 150px; display: block; margin: 20px auto;" />
                </div>
                <div class="food-btns">
                    <b-button pill variant="danger" size="sm" style="margin-right: 5px" @click="onClickRecommend(food.foodId)">추천</b-button>
                    <b-button pill variant="warning" size="sm" @click="addTakenFood(food.foodId)">섭취</b-button>                                  </div>
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
            foods: [],
            sortingType: '',
            searchType: '',
            searchKeyword: '',
            msg: '',
            options: [
                { value: null, text: 'Please select some item' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Default Selected Option' },
                { value: 'c', text: 'This is another option' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ]
        }
    },
    mounted() {
        this.selectAllFood()
    },
    methods: {
        selectAllFood() {
            this.$store.dispatch('ALLFOOD')
                        .then(() => this.foods = this.$store.getters.getFoods)
        },
        addTakenFood(foodId) {
            http.post("/taken", {foodId})
            this.$notify({
                group: 'app',
                type: 'warn',
                duration: 1000,
                title: '섭 취 완 료',
            })
        },
        search() {
            http.get(`/foods?searchType=${this.searchType}&searchKeyword=${this.searchKeyword}`)
                .then(res => this.foods = res.data)
        },
        sorting(event) {
            const type = event.target.value            
            if(type==='name') {
                this.foods = this.$store.getters.getFoodsSortByName
            } 
            else if(type==='maker') {
                this.foods = this.$store.getters.getFoodsSortByMaker
            }
        },
        onClickRecommend(foodId) {
            http.put(`/recommend/food/${foodId}`)
            this.$notify({
                group: 'app',
                type: 'error',
                duration: 1000,
                title: '추 천 완 료',
            })
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

.myNotify {
    font-family: 'Jua';
}

</style>