<template>
  <div id="home">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <!-- 这里加载图片可能失败，原因不明，所以按弹幕的建议将公共组件中Swiper.vue文件的第53行 100 改成了 1000 -->
    <home-swiper :banners="banners"></home-swiper>
  </div>
</template>

<script>
//导入顶部导航
import NavBar from 'components/common/navbar/NavBar';
//导入轮播图
import HomeSwiper from './childComps/HomeSwiper.vue'

//网络获取数据
import {getHomeMultidata} from 'network/home';

export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper
  },
  data () {
    return {
      banners:[],
      recommends:[]
    }
  },
  created(){
    //1、请求多个数据
    getHomeMultidata().then(res=>{
      // console.log(res);
      // this.result=res
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
  },
  
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color:#fff
}
</style>