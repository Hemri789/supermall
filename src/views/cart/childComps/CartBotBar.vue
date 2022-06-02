<template>
  <div id='CartBotBar'>
    <div class="checked-all">
      <input type="checkbox" v-model="isCheckAll" @click="checkAll"><label>全选</label>
    </div>
    <div class="total">合计:{{totalPrice}}</div>
    <div class="balance">去结算({{balanceLength}})</div>
  </div>
</template>

<script>
  export default {
    name: 'CartBotBar',
    data () {
      return {
      }
    },
    methods:{
      checkAll(){
        if(this.isCheckAll){  //全部选中
          this.$store.state.cartList.forEach(item => item.checked=false)
        }else{  //部分或全部不选中
          this.$store.state.cartList.forEach(item => item.checked=true)
        }

        // 简化写法！？！-----不！有问题！
        // this.$store.state.cartList.forEach(item => item.checked = !this.isCheckAll)
      }
    },
    computed:{
      balanceLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      totalPrice() {
				return '￥' + this.$store.state.cartList.filter(item => item.checked
				).reduce((preValue, item) => preValue+ item.price * item.count
				,0).toFixed(2)
      },
      isCheckAll:{
        // 这里要加 get 和 set，否则会报错(Computed property "checkall" was assigned to but it has no setter.)
        get(){
          if(this.$store.state.cartList.length === 0) return false
          // 1、使用 filter
          // return !(this.$store.state.cartList.filter(item => !item.checked).length)
          // 2、使用 find
          // return !this.$store.state.cartList.find(item => !item.checked)
          // 3、使用遍历
          for(let item of this.$store.state.cartList){
            if(!item.checked){
              return false
            }
          }
          return true
        },
        set(){}
      }
    }
  }
</script>

<style scoped>
#CartBotBar{
  position: relative;
  bottom: 40px;
  height: 40px;
  z-index: 20;
  background-color: #dedede;
  display: flex;
  justify-content: space-between;
}
  .checked-all{
    margin: 10px 0 0 15px;
    display: flex;
  }
    .checked-all input{
      width: 20px;
      height: 20px;
  }
    .checked-all label{
      margin: 2px 0 0 5px;
      font-size: 14px;
    }
  .total{
    margin-top: 12px;
  }
  .balance{
    width: 90px;
    background-color: coral;
    padding: 10px;
  }
</style>