<template>
	<div id="wrap-header" class="clear-float">
		<h1 class="logo" title="豆瓣电影"><router-link to="/index">豆瓣电影</router-link></h1>
		<div class="wrap-search">
			<input id="inp-sch" type="text" v-model="key" @keyup.enter="searchMovie()" placeholder="请输入搜索内容" />
			<span @click="searchMovie()">搜索</span>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			 key:'',
			 path:"/movie/search"
		}
	},
	methods:{
		searchMovie(){
			var kw=this.key.trim(),$inp=this.$el.querySelector('#inp-sch');
			if(!kw.length){
				//处理未输入查询关键字
				$inp.focus();
				return;
			}
			this.$router.push({path:this.path, query:{key:this.key.trim()}});
            this.key='';
		}
	}
}
</script>


<style>
#wrap-header{width:1000px; margin:0 auto 26px;}
.logo{float:left; font-size:36px;}
.logo a{text-decoration:none; color:#00a6ab;}
.wrap-search{float:right; padding:10px 0 0 0;}
.wrap-search input{float:left; width:300px; height:16px; padding:10px 5px; border:1px solid #ccc;}
.wrap-search span{
	float:left;  padding:7px 10px; font-size:20px;
	background-color:#ccc; line-height:24px; cursor:pointer;
}
</style>
