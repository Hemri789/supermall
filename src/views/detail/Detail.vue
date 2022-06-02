<template>
  <div id='Detail'>
    <detail-nav-bar class="nav-bar" ref="navBar" @itemClick="itemClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shops="shops"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="paramInfo" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="commentInfo" :commentInfo="commentInfo"></detail-comment-info>
      <!-- 复用GoodsList组件 -->
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="showBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
//子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

//滚动组件
import Scroll from 'components/common/scroll/Scroll'
//复用GoodsList组件
import GoodsList from 'components/content/goods/GoodsList'
//回到顶部  混入backTopMixin
import {backTopMixin} from 'common/mixin.js'
//Toast
import Toast from 'components/common/toast/Toast'

//数据获取
import {getDetail,Goods,Shops,paramInfo,getRecommend} from 'network/detail'
import { debounce } from '@/common/utils'


  export default {
    name: 'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList,
      Toast
    },
    mixins:[backTopMixin],
    data () {
      return {
        iid:null,
        topImgs:[],
        goods:{},
        shops:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:[],
        recommend:[],
        themeTopY:[],
        getThemeTopY:null,
        currentIndex:null,
        message:'',
        show:false
      }
    },
    created(){
      //1、传入保存的iid
      this.iid=this.$route.params.iid
      //2、根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        //1、获取顶部轮播图
        // console.log(res);
        const data = res.result
        this.topImgs=data.itemInfo.topImages
        //2、获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo)
      // console.log(this.goods);
      // 3、获取店铺信息
      this.shops = new Shops(data.shopInfo)
      //4、获取商品详细信息
      this.detailInfo = data.detailInfo
      //5、获取参数信息
      this.paramInfo = new paramInfo(data.itemParams.info,data.itemParams.rule)
      // console.log(this.paramInfo);
      //6、获取评论
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list
      }
      getRecommend().then(res=>{
        this.recommend = res.data.list
      })
      })
      this.$nextTick(()=>{
        this.getThemeTopY=debounce(()=>{
        this.themeTopY=[]
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.paramInfo.$el.offsetTop)
        this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        //最后面放一个无穷大的数
        this.themeTopY.push(Number.MAX_VALUE)
        // console.log('-----');
      },100)
      })
    },
    updated(){
      //------------------------------------------------------------
      //如果用 $nextTick 来代替 updated
      //根据最新的数据，对应的DOM是已经被渲染出来
      //但是图片依然是没有加载完（目前获取到 offsetTop 不包含其中的图片）
      // offsetTop 值不对的时候，都是因为图片的问题
      //------------------------------------------------------------
      // // 由于 update 会频繁的更新，所以先将数据清空，这样就不会往 themeTopY 数组后面一直 push
      // this.themeTopY=[]
      // // 将四个距离顶部的值填入themeTopY中
      // this.themeTopY.push(0)
      // this.themeTopY.push(this.$refs.paramInfo.$el.offsetTop)
      // this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop)
      // this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
    },
    methods:{
      imgLoad() {
				this.$refs.scroll.refresh()
        this.getThemeTopY()
			},
      itemClick(index){
        this.itemClickIndex = index
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],200)
      },
      contentScroll(position){
        //返回顶部显示
        this.showBackTop = (-position.y) > 500;
        // console.log(position);
        const positionY = -position.y
        //----------------------老师的代码-----------------------------------------
        let length = this.themeTopY.length
        for(let i = 0;i < length-1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }
          //---------------------------------------------------
          // //先判断 currentIndex 与遍历的 i 下标是否相等 再判断与顶部的距离区间
          // if(this.currentIndex !== i &&((i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])
          // //最后一个只需要判断距顶部的，不需要判断后面的，所以只要 >= 就可以
          // || (i === length - 1 && positionY >= this.themeTopY[i]))){
          //   // 将 i 值先给本地的 currentIndex ，再将这个值传给 DetailNavBar 组件中的 currentIndex
          //   this.currentIndex = i
          //   this.$refs.navBar.currentIndex = this.currentIndex
          // }
          //---------------------------------------------------
        }
        //------------------------------------------------------------------------
        //----------------------我的垃圾代码---------------------------------------
        // if(positionY >= this.themeTopY[0] && positionY < this.themeTopY[1]){
        //   this.currentIndex = 0
        //   this.$refs.navBar.currentIndex = this.currentIndex
        // }else if(positionY >= this.themeTopY[1] && positionY < this.themeTopY[2]){
        //   this.currentIndex = 1
        //   this.$refs.navBar.currentIndex = this.currentIndex
        // }else if(positionY >= this.themeTopY[2] && positionY < this.themeTopY[3]){
        //   this.currentIndex = 2
        //   this.$refs.navBar.currentIndex = this.currentIndex
        // }else if(positionY >= this.themeTopY[1]){
        //   this.currentIndex = 3
        //   this.$refs.navBar.currentIndex = this.currentIndex
        // }
        //------------------------------------------------------------------------
      },
      addCart(){
        // 1、获取购物车中商品需要展示的信息
        const product = {}
        product.image = this.topImgs[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        // 2、将商品添加到购物车中
        // this.$store.cartList.push(product)
        //在 mutations 中调用
        // this.$store.commit('addCart',product)
        //在 actions 中调用
        this.$store.commit('addCart',product)
        //这里没有用跟老师一样的 Promise then 方法,而是直接使用
        this.show = true
        this.message = '您添加了新的商品'
        setTimeout(() => {
          this.show = false
          this.message = ''
        }, 2500);
      }
    }
  }
</script>

<style scoped>
#Detail{
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.nav-bar{
  position: relative;
  z-index: 2;
  background-color: #fff;
}
.content{
  height: calc(100vh - 44px - 58px );
}
</style>