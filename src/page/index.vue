<template>
	<div class="wrap-main">
		<div class="wrap-list-comm" v-if="intheaters.length>0">
			<div class="list-comm-tit clear-float">
				<h3>正在热映</h3>
				<router-link to="/intheaters">更多&gt;&gt;</router-link>
			</div>
			<div class="box-list-comm">
				<ul class="list-comm-main clear-float">
					<li v-for="item in intheaters">
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-cover"><img :src="item.images.medium" /></router-link>
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-name">{{item.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="wrap-list-comm" v-if="comingsoon.length>0">
			<div class="list-comm-tit clear-float">
				<h3>即将上映</h3>
				<router-link to="/comingsoon">更多&gt;&gt;</router-link>
			</div>
			<div class="box-list-comm">
				<ul class="list-comm-main clear-float">
					<li v-for="item in comingsoon">
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-cover"><img :src="item.images.medium" /></router-link>
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-name">{{item.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="wrap-list-comm" v-if="top250.length>0">
			<div class="list-comm-tit clear-float">
				<h3>Top250</h3>
				<router-link to="/top250">更多&gt;&gt;</router-link>
			</div>
			<div class="box-list-comm">
				<ul class="list-comm-main clear-float">
					<li v-for="item in top250">
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-cover"><img :src="item.images.medium" /></router-link>
						<router-link :to="{name:'subject-detail',params:{id:item.id}}" class="movie-name">{{item.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default{
	name:'dhead',
	data(){
		return{
			intheaters:[],
			comingsoon:[],
			top250:[]
		}
	},
	methods:{
		getMovieByintheaters(){
			return axios.get("/api/movie/in_theaters?start=0&count=10");
		},
		getMovieBycomingsoon(){
			return axios.get("/api/movie/coming_soon?start=0&count=10");
		},
		getMovieBytop250(){
			return axios.get("/api/movie/top250?start=0&count=10");
		},
		getmovieByindex(){
			var that=this;
			axios.all([that.getMovieByintheaters(),that.getMovieBycomingsoon(),that.getMovieBytop250()])
			.then(axios.spread(function (intheatersct,comingsoon,top250){
				//console.log(intheatersct);
				//console.log(intheatersct);
				//console.log(comingsoon);
				//console.log(top250);
				console.log("===========需要的数据===========");
				//console.log(intheatersct.data.subjects);
				that.intheaters=that.intheaters.concat(intheatersct.data.subjects);
				that.comingsoon=that.comingsoon.concat(comingsoon.data.subjects);
				that.top250=that.top250.concat(top250.data.subjects);
				//console.log(that.intheaters);
			}))
			.catch(function (error) {
				console.log(error);
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
		this.getmovieByindex();
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
