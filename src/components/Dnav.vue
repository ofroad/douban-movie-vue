<template>
	<div id="wrap-nav" class="clear-float">
		<ul class="clear-float">
			<li title="首页"><router-link to="/index">首页</router-link></li>
			<li title="正在热映"><router-link to="/intheaters">正在热映</router-link></li>
			<li title="即将上映"><router-link to="/comingsoon">即将上映</router-link></li>
			<li title="Top250"><router-link to="/top250">Top250</router-link></li>
		</ul>
	</div>
</template>

<script>
export default{
	name:'Dnav',
	data(){
		return{
			msg:'Welcome to Your Vue.js App'
		}
	}
}
</script>


<style>
#wrap-nav{width:100%; margin:0 0 50px 0; border-bottom:2px solid #ccc; font-size:18px;}
#wrap-nav ul{width:1000px; margin:0 auto;}
#wrap-nav ul li{float:left; margin:0 20px 0 0;}
#wrap-nav a{display:inline-block; padding:5px 10px 6px;}
#wrap-nav .cur{background-color:#ccc;}

</style>
