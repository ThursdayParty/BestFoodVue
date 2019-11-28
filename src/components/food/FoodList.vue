<template>
    <div id="foodlist">
        
        <notifications group="app" position="bottom center" class="myNotify"/>
        <ImageSlider></ImageSlider>

        <b-container class='bv-example-row fluid'>
            <b-row>
                <b-col cols="8" align='left'>
                    <b-form-select v-model="searchType" :options="searchOptions" size="sm" style="width: 17%;">
                    </b-form-select>
                    <!-- <b-form-input v-model="searchKeyword" placeholder="검색어를 입력하세요"></b-form-input> -->
                    <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요">
                    <b-button size="sm" variant="outline-secondary" @click="search">검색</b-button>          
                </b-col>
                <b-col cols="4" align='right'>
                    <b-form-select v-model="sortingType" :options="sortingOptions" size="sm" style="width: 35%;">                        
                    </b-form-select>
                </b-col>
            </b-row>
        </b-container>

        <div class="food-wrapper" v-for="food in foods" :key="food.foodId">
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
            searchOptions: [
                { value: '', text: '검색' },
                { value: 'name', text: '이름' },
                { value: 'maker', text: '제조사' },
                { value: 'materials', text: '재료' },
            ],
            sortingOptions: [
                { value: '', text: '정렬' },
                { value: '', text: '추천순' },
                { value: 'name', text: '이름순' },
                { value: 'maker', text: '제조사순' },
            ],
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
            if(this.searchType==='') {
                this.$notify({
                    group: 'app',
                    type: 'default',
                    duration: 1000,
                    title: '검색기준을 선택하세요.',
                })
            } else {
                http.get(`/foods?searchType=${this.searchType}&searchKeyword=${this.searchKeyword}`)
                    .then(res => this.foods = res.data)
            }
        },
        /* sorting(event) {
            const type = event.target.value            
            if(type==='name') {
                this.foods = this.$store.getters.getFoodsSortByName
            } 
            else if(type==='maker') {
                this.foods = this.$store.getters.getFoodsSortByMaker
            }
        }, */
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
    watch: {
        sortingType(type) {
            if(type==='name') {
                this.foods = this.$store.getters.getFoodsSortByName
            } 
            else if(type==='maker') {
                this.foods = this.$store.getters.getFoodsSortByMaker
            }
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

.bv-example-row {
    padding: 16px;
}

</style>