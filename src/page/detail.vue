<template>
	<div class="wrap-main">

		{{this.id}}	
	</div>
</template>

<script>
import axios from 'axios';

export default{
	name:'dhead',
	data(){
		return{
			id:""
		}
	},
	methods:{
		
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
		this.id=this.$route.params.id;
	},
	mounted:function(){
		//this.getmovieByindex();
	}
	
}
</script>


<style>
.wrap-list-comm{padding:0 0 36px 0;}
.list-comm-tit{border-bottom:1px solid #ccc;}
.list-comm-tit h3{float:left;}
.list-comm-tit a{float:right;}
.box-list-comm{}
.list-comm-main{}
.list-comm-main li{float:left; width:180px; margin:16px 20px 0 0;}
.movie-cover{display:block; overflow:hidden; width:100%; overflow:hidden; height:257px;}
.movie-cover img{display:block; width:100%;}
.movie-name{
	display:block; overflow:hidden; text-overflow:ellipsis;
	white-space:nowrap; text-align:center;
}










</style>
