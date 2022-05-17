<template>
  <div id='DetailGoodsInfo' v-if="Object.keys(detailInfo).length!==0">
    <div class="info-desc">
      <div class="start"><p class="s-p1"></p><p class="s-p2"></p></div>
		  <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"><p class="e-p1"></p><p class="e-p2"></p></div>
    </div>
		<div class="key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list" v-for="(item,index) in detailInfo.detailImage[0].list" :key="index">
      <img :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props:{
      detailInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data () {
      return {
        counter:0,
        imgLength:0
      }
    },
    methods:{
      imgLoad(){
        if(++this.counter === this.imgLength){
          this.$emit('imgLoad')
        }
      }
    },
    watch:{
      detailInfo(){
        this.imgLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
.start,.end{
  margin: 10px 15px;
}
.s-p1,.s-p2,.e-p1,.e-p2{
    background-color: #a7a4a8;
}
.s-p1,.e-p1{
  width: 5px;
  height: 5px;
}
.s-p2,.e-p2{
  height: 1px;
  width: 100px;
}
.end{
  position: relative;
}
.e-p1{
  position: absolute;
  right: 0;
}
.e-p2 {
  position: absolute;
  right: 0;
  bottom: -6px;
}
.desc{
  margin: 20px 10px;
}
.key{
  display: flex;
  font-size: 20px;
  font-family: '微软雅黑';
  justify-content: center;
  margin: 50px 0 20px 0;
}
img{
  width: 100%;
}
</style>