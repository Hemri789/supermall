<template>
  <div id="home">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- Scroll滚动 -->
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <!-- 这里加载图片可能失败，原因不明，所以按弹幕的建议将公共组件中Swiper.vue文件的第53行 100 改成了 1000 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 推荐信息展示 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- TabControl -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精品']"
        @tabClick="tabClick"
      ></tab-control>
      <!-- GoodsList -->
      <goods-list :goods="showGoods"></goods-list>
      
    </scroll>
    <back-top @click.native="backTopClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
//导入轮播图
import HomeSwiper from "./childComps/HomeSwiper";
//推荐信息展示
import RecommendView from "./childComps/RecommendView";
//本周流行
import FeatureView from "./childComps/FeatureView";

//导入顶部导航
import NavBar from "components/common/navbar/NavBar";
//TabControl
import TabControl from "components/content/tabControl/TabControl";
//GoodsList
import GoodsList from "components/content/goods/GoodsList";
//Scroll滚动
import Scroll from "components/common/scroll/Scroll";
//BackTop返回顶部按钮
import BackTop from 'components/content/backTop/BackTop';

//网络获取数据-----------------------------------
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      showBackTop:false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1、请求多个数据
    this.getHomeMultidata();
    //2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
      事件监听相关方法--------------------------------------------
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backTopClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position){
      // console.log(position);
      if(position.y<-1000){
        this.showBackTop=true
      }else{
        this.showBackTop=false
      }
    },
    /**
      网络请求相关方法-----------------------------------------------------
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // this.result=res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 1;
}
.content {
  /* overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* margin-top:44px ;
  /* height: 400px; */
  /* height: calc(100% - 93px ); */
  /* overflow: hidden;  */ 
}
</style>