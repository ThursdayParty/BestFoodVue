<template>
  <div id="app">

    <Header></Header>

    <Menu></Menu>

    <router-view/>

    <hr>
    <Footer></Footer>

  </div>
</template>

<script>
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
export default {
  components: {
    Header,
    Menu,
    Footer
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Do+Hyeon|Jua|Nanum+Gothic&display=swap");

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #685F74;
  padding: 25px 120px;
  font-size: 14px;
}

a {
  color: #685F74 !important;
}

input {
  font-size: 12px;
}

textarea {
  font-size: 12px;
}

input.txt {
  padding-top: 3px;
  height: 18px;
}

select {
  font-size: 12px;
  height: 20px;
}

/* 세로 형식 */

.list_table {
  width: 98%;
  border-bottom: 1px solid #EFEFEF;
  border-right: 1px solid #EFEFEF;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  clear: both;
}

.list_table td,
.list_table th {
  text-align: center;
  border-top: 1px solid #EFEFEF;
  border-left: 1px solid #EFEFEF;
  padding: 0.3em;
}

.list_table th {
  font-family: 'Jua';
  background-color: #84AC67;
  color: #FFFFFF;
  line-height: 1.7em;
  font-weight: normal;
}

.list_table tr td {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.list_table td.title {
  padding-left: 0.5em;
  text-align: left;
}

.list_table td.title a:hover {
  text-decoration: underline;
}

.list_table th,
.list_table td {
  vertical-align: middle;
}

.list_table select {
  height: 19px;
  border: #CCCCCC solid 1px;
  vertical-align: middle;
  line-height: 1.8em;
  padding-left: 0px;
}

.list_table select option {
  margin-right: 10px;
}

.list_table .selected_row {
  border: solid 0px #EFEFEF;
}

.list_table .sele {
  padding: 0;
  margin: 0;
}

/* 가로 형식 */

.content_table {
  width: 100%;
  border-bottom: 1px solid #F0F2E7;
  border-right: 1px solid #F0F2E7;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  clear: both;
  font-family: 'Jua';
}

.content_table td,
.content_table th {
  text-align: center;
  border-left: 1px solid #F0F2E7;
  padding: 0.3em;
}

.content_table th {
  border-top: 1px solid #FFFFFF;
  background-color: #F0F2E7;
  color: #685F74;
  line-height: 1.7em;
  font-weight: normal;
  width: 20%;
}

.content_table td {
  border-top: 1px solid #F0F2E7;
  padding-left: 5px;
  text-align: left;
  line-height: 1.7em;
}

.content_table td.contents {
  width: 100%;
  height: 400px;
  overflow: auto;
}

.content_table th,
.content_table td {
  vertical-align: middle;
}

.content_table select {
  height: 19px;
  border: #CCCCCC solid 1px;
  vertical-align: middle;
  line-height: 1.8em;
  padding-left: 0px;
}

.content_table select option {
  margin-right: 10px;
}

.search_box {
  width: 98%;
  border-width: 1px;
  border-style: solid;
  border-color: #EFEFEF;
  background-color: #FFFFFF;
  padding: 2px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 2.1em;
}
</style>
