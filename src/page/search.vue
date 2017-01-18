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
			sch:[],
			loading:true,
			neterrorshow:false,
			nodatashow:false
		}
	},
	methods:{
		getMovieBySch(key){
			var that=this;
			axios.get("/api/movie/search?q="+key)
			.then(function (response) {
				console.log(response);
				that.sch=that.sch.concat(response.data.subjects);
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
		this.getMovieBySch(key);
	}
	
}
</script>
</script>


<style>


</style>
