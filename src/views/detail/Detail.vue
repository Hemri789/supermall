<template>
  <div id='Detail'>
    <detail-nav-bar class="nav-bar"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shops="shops"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
    </scroll>
    <ul>
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
//子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

//滚动组件
import Scroll from 'components/common/scroll/Scroll'

//数据获取
import {getDetail,Goods,Shops,paramInfo} from 'network/detail'


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

      Scroll
    },
    data () {
      return {
        iid:null,
        topImgs:[],
        goods:{},
        shops:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:[]
      }
    },
    created(){
      //1、传入保存的iid
      this.iid=this.$route.params.iid
      //2、根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        //1、获取顶部轮播图
        console.log(res);
        const data = res.result
        this.topImgs=data.itemInfo.topImages
        //2、获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo)
      // 3、获取店铺信息
      this.shops = new Shops(data.shopInfo)
      //4、获取商品详细信息
      this.detailInfo = data.detailInfo
      //5、获取参数信息
      this.paramInfo = new paramInfo(data.itemParams.info,data.itemParams.rule)
      //6、获取评论
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list
        console.log(this.commentInfo);
      }
      })
      
    },
    methods:{
      imgLoad() {
				this.$refs.scroll.refresh()
			},
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
  height: calc(100vh - 44px);
}
</style>