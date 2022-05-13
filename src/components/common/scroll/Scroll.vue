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
      probeType: this.probeType
    })
    //监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
  },
  methods: {
    //返回顶部时间 time
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(0, 0, time);
    },
  },
};
</script>

<style scoped>
</style>