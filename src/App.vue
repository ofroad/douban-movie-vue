<template>
	<div id="app">
		<dhead></dhead>
		<dnav></dnav>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
		<dfoot></dfoot>
	</div>
</template>

<script>
import Dhead from './components/Dhead'
import Dfoot from './components/Dfoot'
import Dnav from './components/Dnav'

export default{
	name:'app',
	components:{
		Dhead,
		Dfoot,
		Dnav
	}
}
</script>

<style>
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre, 
form,fieldset,input,textarea,p,blockquote,th,td { 
    padding: 0; 
    margin: 0; 
} 
table { border-collapse: collapse;  border-spacing: 0; }
fieldset,img { border:0; } 
a{text-decoration:none;}
address,caption,cite,code,dfn,em,strong,th,var { 
    font-weight: normal; 
    font-style: normal; 
} 
ol,ul {list-style: none; } 
caption,th{text-align: left; } 
h1,h2,h3,h4,h5,h6 { font-weight: normal; font-size: 100%; }
body{
	font-family:\5FAE\8F6F\96C5\9ED1, Helvetica, Arial, sans-serif;
	color:#2c3e50; font-size:16px; line-height:1.5;
}
#app{margin:30px 0 0 0;}
.clear-float:after{display:block; height:0; visibility:hidden; clear:both; content:'.';}
.clear-float{zoom:1;}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease; 
}

.fade-enter, .fade-leave-active {
  opacity: 0; 
}

.wrap-main{width:1000px; margin:0 auto;}
</style>
