<template>
    <div id="foodlist">
        <!-- <div class="food-wrapper" v-for="food in foods" :key="food.code">
            <div class="food-img">
                <img :src="food.food_img"
                     style="height: 150px; display: block; margin: 20px auto;" />
            </div>

            <div class="food-body">
                <a href="food.do?code=<c:out value="${food.code}"></c:out>">
                    <h1 style="font-family: Jua, sans-serif; display: inline-block;">
                        <c:out value="${food.name}"></c:out>
                    </h1> 
                    <span>-</span>
                    <h5 style="font-family: Jua, sans-serif;display: inline-block;">
                        <c:out value="${food.maker}"></c:out>
                    </h5> 
                    <div>
                        <c:out value="${food.material}"></c:out>
                    </div>
                </a>
            </div>
        </div>  -->
    </div>
</template>

<script>
// import http from "../../http-common";
export default {
    name: 'foodlist',
}
</script>

<style scoped>
/* .food-wrapper {
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
} */
</style>