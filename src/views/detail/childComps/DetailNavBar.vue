<template>
  <div class='DetailNavBar'>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" 
        class="title-item"
        :class="{active:index === currentIndex}"
        @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components:{
      NavBar
    },
    data () {
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      backClick(){
        this.$router.go(-1)
      },
      itemClick(index){
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
.back img{
  margin-top: 10px;
}
.title{
  display: flex;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
</style>