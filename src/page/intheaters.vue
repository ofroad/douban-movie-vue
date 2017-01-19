<template>
	<div class="wrap-main">
		<div class="wrap-list-comm" v-if="intheaters.length>0">
			<div class="list-comm-tit clear-float">
				<h3>正在热映</h3>
			</div>
			<div class="box-list-comm">
				<ul class="list-comm-main clear-float">
					<li v-for="item in intheaters">
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-cover"><img :src="item.images.medium" /></router-link>
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-name" :title="item.title">{{item.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
		<span id="btn-loadmore" v-show="showloadmore" @click="getMovieByintheaters()">加载更多</span>
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
	name:'Intheaters',
	components:{Dloading,Neterror,Nodata},
	data(){
		return{
			intheaters:[],
			loading:true,
			neterrorshow:false,
			m:0,
			i:0,
			canloaddata:true,
			showloadmore:false
		}
	},
	methods:{
		getMovieByintheaters(){
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
			
			axios.get("/api/movie/in_theaters",{
				params:{
					start:(that.m)*that.i,
					count:20
				}
			})
			.then(function (response) {
				console.log("数据成功返回");
				console.log(response);
				that.intheaters=that.intheaters.concat(response.data.subjects);
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
	},
	beforeMount:function(){
		console.log("beforeMount");
	},
	mounted:function(){
		console.log("mounted");
		this.getMovieByintheaters();
	}
	
}
</script>
</script>


<style>


</style>
