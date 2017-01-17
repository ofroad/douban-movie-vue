// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'





Vue.use(VueRouter)
//Vue.use(axios);



//页面
const Index=require('./page/index')
const Intheaters=require('./page/intheaters')
const Comingsoon=require('./page/comingsoon')
const Top250=require('./page/top250')
const Detail=require('./page/detail')
const Page404 = require('./page/page404')

//路由
const routes=[
	{path:'/',redirect:'/index'},
	{path:'/index', name:'index', component:Index },
	{path:'/intheaters', name:'intheaters', component:Intheaters },
	{path:'/comingsoon', name:'comingsoon', component:Comingsoon },
	{path:'/top250', name:'top250', component:Top250 },
	{path: '/movie/subject/:id', name:'subject-detail', component:Detail},
	{path:'*', name:'page404', component: Page404 },
]

const router = new VueRouter({
    routes:routes, // short for routes: routes
    linkActiveClass:'cur'     //router-link的选中状态的class，也有一个默认的值

})


new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: { App }
})
