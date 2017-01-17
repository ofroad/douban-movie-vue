<template>
	<div class="wrap-main">
		<div class="wrap-detail clear-float">
		{{ moviedetail.data }}
		</div>
		<div class="wrap-detail clear-float">
		{{ moviedetail.data }}
		</div>
		<div class="wrap-detail clear-float">
		{{ moviedetail.data.title }}
		</div>
		<dloading v-show="loading"></dloading>
		<neterror v-show="neterrorshow"></neterror>
	</div>
</template>

<script>
import axios from 'axios';
import Dloading from '../components/Dloading'
import Neterror from '../components/Neterror'

export default{
	name:'dhead',
	components:{Dloading,Neterror},
	data(){
		return{
			id:"",
			moviedetail:{},
			loading:true,
			neterrorshow:false
		}
	},
	methods:{
		getMovieDetail(){
			console.log("执行getMovieDetail");
			var that=this;
			axios.get("/api/movie/subject/"+that.id)
			.then(function (response) {
				console.log(response);
				that.moviedetail=response;
				that.loading=false;
				console.log("======that.moviedetail======");
				console.log(that.moviedetail);
				
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
		console.log(this.$route);
	},
	created:function(){
		console.log("created");
		console.log(this.$route);
	},
	beforeMount:function(){
		console.log("beforeMount");
		console.log(this.$route);
		
	},
	mounted(){
		this.id=this.$route.params.id;
		console.log("执行mounted");
		this.getMovieDetail();
	}
	
}
</script>


<style>
.wrap-detail{}
.detail-cover{float:left;}









</style>
