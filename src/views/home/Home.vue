<template>
  <div id="home">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        :titles="['流行', '新款', '精品']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"
      ></tab-control>
    <!-- Scroll滚动 -->
    <scroll class="content" ref="scroll" 
    :probeType="3" @scroll="contentScroll"
    :pull-up-load="true" @pullingUp="loadMore">
      <!-- 轮播图 -->
      <!-- 这里加载图片可能失败，原因不明，所以按弹幕的建议将公共组件中Swiper.vue文件的第53行 100 改成了 1000 -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <!-- 推荐信息展示 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- TabControl -->
      <tab-control
        :titles="['流行', '新款', '精品']"
        @tabClick="tabClick"
        ref="tabControl2"
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
import {backTopMixin} from 'common/mixin.js'

//网络获取数据-----------------------------------
import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from 'common/utils'

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
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    };
  },
  mixins:[backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated(){
    //设置进首页时的位置
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated(){
    //记录离开首页时的位置
    this.saveY = this.$refs.scroll.getCurrentY()
  },
  created() {
    //1、请求多个数据
    this.getHomeMultidata();
    //2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted(){
    //item中图片加载完成监听
    const refresh=debounce(this.$refs.scroll.refresh,100)
    this.$bus.$on('imgLoad',()=>{
      refresh()
    })
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
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    //滑动超过1000显示返回顶部按钮
    contentScroll(position){
      //1、判断backTop是否显示
      // console.log(position);
      if(position.y<-1000){
        this.showBackTop=true
      }else{
        this.showBackTop=false
      }
      //2、判断tabControl是否吸顶
      this.isTabFixed=(-position.y)>this.tabOffsetTop

    },
    //上拉加载更多
    loadMore(){
      // console.log('记载中');
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad(){
      // 2、获取tabcontrol的offsetTop
    //所有组件都有一个属性 $el  用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
    this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
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
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
  padding-top:44px ;
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
.tab-control{
  position: relative;
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
  /* overflow: hidden;   */
}
</style>