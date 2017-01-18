<template>
	<div class="wrap-main">
		<div class="wrap-detail" v-if="moviedetail.title"><!--此处判断很重要，否则会报错-->
			<h3>{{moviedetail.title}}({{moviedetail.year}})</h3>
			<div class="box-detail clear-float">
				<img class="detail-cover" :src="moviedetail.images.large" />
				<ul class="box-detail-main">
					<li>原名：{{moviedetail.original_title}}</li>
					<li>别名：{{kaka}}</li>
					<li>导演：{{kdirectors}}</li>
					<li>主演：{{kcasts}}</li>
					<li>影片类型：{{kgenres}}</li>
					<li>制片国家/地区：{{kcountries}}</li>
					<li>豆瓣评分：{{kaverage}}</li>
					<li>有{{moviedetail.ratings_count}}人参与评分</li>
					<li>有{{moviedetail.wish_count}}人想看这部电影</li>
					<li>有{{moviedetail.collect_count}}人看过这部电影</li>
				</ul>
			</div>
			<p class="detail-summary">{{moviedetail.summary}}</p>
		</div>
		<dloading v-show="loading"></dloading>
		<neterror v-show="neterrorshow"></neterror>
	</div>
</template>

<script>
import axios from 'axios'
import Dloading from '../components/Dloading'
import Neterror from '../components/Neterror'

export default{
	components:{Dloading,Neterror},
	data(){
		return{
			moviedetail:{},
			id:"",
			loading:true,
			neterrorshow:false
		}
	},
	computed:{
		kdirectors(){
			var d=[];
			console.log("============computed=============");
			console.log(this.moviedetail);

			this.moviedetail.directors.forEach(function(ele){
				d.push(ele.name);
			});
			return d.join("/");
		},
		kcasts(){
			var d=[];
			console.log("============computed=============");
			console.log(this.moviedetail);

			this.moviedetail.casts.forEach(function(ele){
				d.push(ele.name);
			});
			return d.join(" / ");
		},
		kgenres(){
			return this.moviedetail.genres.join(" / ");
		},
		kcountries(){
			return this.moviedetail.countries.join(" / ");
		},
		kaverage(){
			var m="暂无";
			if(this.moviedetail.rating.average!==0){
				m=this.moviedetail.rating.average;
			}
			return m;
		},
		kaka(){
			return this.moviedetail.aka.join(" / ");
		}
	},
	methods:{
		getMovieDetail(key){
			var that=this;
			axios.get("/api/movie/subject/"+key)
			.then(function (response) {
				console.log(response);
				that.moviedetail=response.data;
				that.loading=false;
				console.log("======that.moviedetail======");
				console.log(that.moviedetail);
				
			})
			.catch(function (error) {
				//console.log(error);
				that.loading=false;
				that.neterrorshow=true;
			});
		}
	},
	beforeCreate:function(){
		console.log("beforeCreate");
		
	},
	created:function(){
		console.log("created");
		
	},
	beforeMount:function(){
		console.log("beforeMount");
		
	},
	mounted:function(){
		console.log("执行mounted");
		
		var key=this.$route.params.id;
		console.log("key---"+key);
		this.getMovieDetail(key);
	}
	
}
</script>

<style>
.wrap-detail{font-size:18px;}
.detail-cover{float:left; width:300px; margin:0 36px 0 0;}
.wrap-detail h3{padding:0 0 20px 0; text-align:center; font-size:24px;}
.box-detail{}
.box-detail-main{overflow:hidden; line-height:2;}







.detail-summary{padding:20px 0 0 0;}





</style>
