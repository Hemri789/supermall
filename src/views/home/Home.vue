<template>
  <div id="home">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <!-- 这里加载图片可能失败，原因不明，所以按弹幕的建议将公共组件中Swiper.vue文件的第53行 100 改成了 1000 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐信息展示 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 本周流行 -->
    <feature-view></feature-view>
    <!-- TabControl -->
    <tab-control class="tab-control" :titles="['流行','新款','爆款']"></tab-control>
    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
//导入轮播图
import HomeSwiper from './childComps/HomeSwiper'
//推荐信息展示
import RecommendView from './childComps/RecommendView'
//本周流行
import FeatureView from './childComps/FeatureView'

//导入顶部导航
import NavBar from 'components/common/navbar/NavBar';
//TabControl
import TabControl from 'components/content/tabControl/TabControl';

//网络获取数据-----------------------------------
import {getHomeMultidata} from 'network/home';


export default {
  name: 'Home',
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl
  },
  data () {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'news':{page:0,list:[]},
        'sell':{page:0,list:[]},
      }
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
  #home{
    padding-top:44px ;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
  }
</style>