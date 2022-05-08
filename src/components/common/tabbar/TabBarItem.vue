<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 尽量在插槽外面套一层div，以免使用插槽，插槽被替换的时候里面的属性也被修改 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
  name: 'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
    data () {
      return {
        // isActive:false,
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick(){
        this.$router.push(this.path)
      }
    },
  }
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* .active{
  color: red;
} */
</style>