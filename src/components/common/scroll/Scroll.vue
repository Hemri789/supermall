<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      //非 button 按钮需要设置 click 为 ture
      click: true,
      observeDOM: true,
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad
      
    })
    //监听滚动位置
    if(this.probeType === 2 || this.probeType === 3 ){
      this.scroll.on('scroll',(position)=>{
      // console.log(position);
        this.$emit('scroll',position)
      })
    }
    //监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
      console.log('加载中');
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    //返回顶部时间 time
    scrollTo(x=0, y=0, time = 300) {
      //this.scroll用于判断是否有这个值
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('----');
      this.scroll.refresh()
    },
    getCurrentY(){
      return this.scroll && this.scroll.y || 0
    }
  },
};
</script>

<style scoped>
</style>