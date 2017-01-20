<template>
	<div class="wrap-main">
		<div class="wrap-list-comm" v-if="sch.length>0">
			<div class="list-comm-tit clear-float">
				<h3>"{{this.$route.query.key}}"的搜索结果</h3>
			</div>
			<div class="box-list-comm">
				<ul class="list-comm-main clear-float">
					<li v-for="item in sch">
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-cover"><img :src="item.images.medium" /></router-link>
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-name" :title="item.title">{{item.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
		<span id="btn-loadmore" v-show="showloadmore" @click="getMovieBySch">加载更多</span>
		<dloading v-show="loading"></dloading>
		<neterror v-show="neterrorshow"></neterror>
		<!--
		<nodata v-show="nodatashow"></nodata>
		-->
	</div>
	
</template>

<script>
import axios from 'axios';
import Dloading from '../components/Dloading'
import Neterror from '../components/Neterror'
import Nodata from '../components/Nodata'

export default{
	name:'Searchlist',
	components:{Dloading,Neterror,Nodata},
	data(){
		return{
			sch:[],
			loading:true,
			neterrorshow:false,
			m:0,
			i:0,
			canloaddata:true,
			showloadmore:false,
			key:this.$route.query.key
		}
	},
	//增加watch路由,使得能够在搜索结果页再次搜索时能重新请求数据
	watch:{
		'$route':'loadsch'
	},
	methods:{
		loadsch(){
			this.sch=[];
			this.m=0;
			this.i=0;
			this.key=this.$route.query.key;
			this.getMovieBySch();
		},
		getMovieBySch(){
			var that=this;
			if(!that.canloaddata){
				console.log("当前加载按钮禁用");
				return;
			}
			
			console.log("当前加载按钮可以用--开始请求数据");
			console.log(that.i);
			that.canloaddata=false;
			console.log(that.$el.querySelector('#btn-loadmore'))
			that.$el.querySelector('#btn-loadmore').textContent="数据加载中...";
			
			axios.get("/api/movie/search",{
				params:{
					q:that.key,
					start:(that.m)*that.i,
					count:20
				}
			})
			.then(function (response) {
				console.log("数据成功返回");
				console.log(response);
				that.sch=that.sch.concat(response.data.subjects);
				that.m=response.data.count;
				
				console.log(that.i);
				that.loading=false;
				that.canloaddata=true;
				that.$el.querySelector('#btn-loadmore').textContent="加载更多";
				
				if((that.i+1)*that.m > response.data.total){
					that.showloadmore=false;
				}else{
					that.showloadmore=true;
				}
				
				that.i=(that.i)+1;
			})
			.catch(function (error) {
				console.log("请求报错");
				console.log(error);
				that.loading=false;
				that.neterrorshow=true;
				that.canloaddata=true;
				that.$el.querySelector('#btn-loadmore').textContent="加载更多";
			});
		}
	},
	beforeCreate:function(){
		console.log("beforeCreate");
	},
	created:function(){
		console.log("created");
		console.log(this.$route)
	},
	beforeMount:function(){
		console.log("beforeMount");
	},
	mounted:function(){
		console.log("mounted");
		var key=this.$route.query.key;
		this.getMovieBySch();
	}
	
}
</script>
</script>


<style>


</style>
