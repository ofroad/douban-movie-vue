<template>
	<div class="wrap-main">
		<div class="wrap-list-comm" v-if="top250.length>0">
			<div class="list-comm-tit clear-float">
				<h3>Top250</h3>
			</div>
			<div class="box-list-comm">
				<ul class="list-comm-main clear-float">
					<li v-for="item in top250">
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-cover"><img :src="item.images.medium" /></router-link>
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-name" :title="item.title">{{item.title}}</router-link>
					</li>
				</ul>
			</div>
			
		</div>
		<span id="btn-loadmore" v-show="showloadmore" @click="getMovieBytop250()">加载更多</span>
		<dloading :showloading="loading"></dloading><!--loading使用prop传递数据-->
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
	name:'Top250',
	components:{Dloading,Neterror,Nodata},
	data(){
		return{
			top250:[],
			loading:true,
			neterrorshow:false,
			nodatashow:false,
			m:0,
			i:0,
			canloaddata:true,
			showloadmore:false
		}
	},
	methods:{
		getMovieBytop250(){
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
			axios.get("/api/movie/top250",{
				params:{
					start:(that.m)*that.i,
					count:20
				}
			})
			.then(function (response) {
				console.log("数据成功返回");
				console.log(response);
				that.top250=that.top250.concat(response.data.subjects);
				that.m=response.data.count;

				that.loading=false;
				that.showloadmore=true;
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
	},
	beforeMount:function(){
		console.log("beforeMount");
	},
	mounted:function(){
		console.log("mounted");
		this.$nextTick(function(){
			this.getMovieBytop250();
		});
		
	}
	
}
</script>
</script>


<style>
#btn-loadmore{display:block; margin:30px 0 0 0; border:1px solid #ccc; text-align:center; cursor:pointer;}




</style>
