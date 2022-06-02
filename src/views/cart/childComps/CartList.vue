<template>
  <div id='CartList'>
    <cart-list-item v-for="(item,index) in $store.state.cartList" :product="item" :key="index">
    </cart-list-item>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

  export default {
  components: { 
    CartListItem 
  },
    name: 'CartList',
    data () {
      return {

      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>