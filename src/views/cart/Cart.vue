<template>
  <div id="Cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll" :probe-type="3">
      <cart-list></cart-list>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bot-bar></cart-bot-bar>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBotBar from './childComps/CartBotBar'

import Scroll from 'components/common/scroll/Scroll'


  export default {
  components: {
    NavBar,
    CartList,
    CartBotBar,

    Scroll
  },
  name: 'Cart',
    data () {
      return {
      }
    },
    computed:{
      cartLength(){
        // console.log(this.$store.state.cartList);
        return this.$store.state.cartList.length
      }
    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
#Cart{
  height: 100vh;
}
.nav-bar{
  background-color:  var(--color-tint);
  color: #fff;
  font-weight: 600;
  position: relative;
  z-index: 2;
}
.content{
  height: calc(100vh - 44px - 49px);
}
</style>