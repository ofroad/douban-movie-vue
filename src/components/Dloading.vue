<template>
	<div id="wrap-loading" v-show="showloading">数据正在加载中...</div>
</template>

<script>
export default{
	name:'Dloading',
	props:["showloading"],
	data(){
		return{
			msg:'Welcome to Your Vue.js App'
		}
	}
}
</script>


<style>
#wrap-loading{text-align:center;}

</style>
