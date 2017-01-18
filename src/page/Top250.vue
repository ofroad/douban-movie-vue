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
			<span @click="getMovieBytop250()">加载更多</span>
		</div>
		
		<dloading v-show="loading"></dloading>
		<neterror v-show="neterrorshow"></neterror>
		<nodata v-show="nodatashow"></nodata>
	</div>
	
</template>

<script>
import axios from 'axios';
import Dloading from '../components/Dloading'
import Neterror from '../components/Neterror'
import Nodata from '../components/Nodata'

export default{
	name:'zz',
	components:{Dloading,Neterror,Nodata},
	data(){
		return{
			top250:[],
			loading:true,
			neterrorshow:false,
			nodatashow:false,
			m:0,
			i:0
		}
	},
	methods:{
		getMovieBytop250(){
			var that=this;
			
			console.log(that.i);
			axios.get("/api/movie/top250",{
				params:{
					start:(that.m)*that.i,
					count:20
				}
			})
			.then(function (response) {
				console.log(response);
				that.top250=that.top250.concat(response.data.subjects);
				that.m=response.data.count;
				that.i=(that.i)+1;
				if(!response.data.subjects.length){
					that.nodatashow=true;
				}
				that.loading=false;
			})
			.catch(function (error) {
				console.log(error);
				that.loading=false;
				that.neterrorshow=true;
			});
		},
		getMovieMore(){
			//this.getMovieBytop250();
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
		this.getMovieBytop250();
	}
	
}
</script>
</script>


<style>


</style>
