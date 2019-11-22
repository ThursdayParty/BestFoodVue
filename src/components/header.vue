<template>
    <div id="header">
        <router-link to="/">SAFEFOOD</router-link> | 
        <router-link to="/login">Login</router-link>

        <div>
            {{greeting}}
        </div>


        <!-- <c:choose>
            <c:when test="${empty sessionScope.userid }">
                <div class="col-md-3 col-md-offset-5" id="statuslogout111">
                    <a class="btn btn-primary" href="#" data-toggle="modal" data-target="#modalLoginForm">Log In</a> 
                    <a class="btn btn-primary" href="#" data-toggle="modal" data-target="#modalRegisterForm">Sign Up</a>
                    <a class="btn btn-primary" href="#" data-toggle="modal" data-target="#findpass">비밀번호 찾기</a>
                </div>
            </c:when>
            <c:otherwise>
                <div class="col-md-3 col-md-offset-5" id="statuslogin111">
                    ${sessionScope.userid.id }님 반갑습니다.
                    
                    <form action="logout.do" method="post" id="logoutForm"></form>
                    <a class="btn btn-primary" id="logOut" onclick="document.getElementById('logoutForm').submit();">Log Out</a> 
                    <a class="btn btn-primary" href="#" data-toggle="modal" data-target="#modalInformationForm">Info</a> 
                    <a class="btn btn-primary" href="#" data-toggle="modal" data-target="#modifyForm">회원정보 수정</a>
                </div>
            </c:otherwise>
        </c:choose> -->
    </div>
</template>

<script>
/*
    사용자의 아이디를 띄울지 말지를
    mounted할때 api에 연결해서 인증했는지 안했는지 체크한다
    인증했는지 안했는지 여부는 토큰을 가지고 있는지 아닌지 맞는지 아닌지
*/
// import http from "../http-common";
export default {
    name: "header",
    data() {
        return {
            greeting: ""
        }
    },
    /* mounted() {
        http.get("/greeting")
            .then(res => this.greeting = res.data.greeting)
    }, */
}
</script>