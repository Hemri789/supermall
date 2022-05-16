<template>
  <div class='Detail'>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-imgs="topImgs"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail} from 'network/detail'


  export default {
    name: 'Detail',
    components:{
      DetailNavBar,
      DetailSwiper
    },
    data () {
      return {
        iid:null,
        topImgs:[]
      }
    },
    created(){
      //1、传入保存的iid
      this.iid=this.$route.params.iid
      //2、根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        // console.log(res);
        this.topImgs=res.result.itemInfo.topImages
      })
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>