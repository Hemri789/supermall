<template>
  <div id='DetailBottomBar'>
		<div class="bot-left">
			<div class="icon sercice">
				<div class="png"><img src="~assets/img/detail/icon01.png" alt=""></div>
				<div class="text">客服</div>
			</div>
			<div class="icon shop">
				<div class="png"><img src="~assets/img/detail/icon02.png" alt=""></div>
				<div class="text">店铺</div>
			</div>
			<div class="icon select">
				<div class="png"><img src="~assets/img/detail/icon03.png" alt=""></div>
				<div class="text">收藏</div>
			</div>
		</div>
		<div class="bot-right">
			<div class="btn btn-cart" @click="addCart">加入购物车</div>
			<div class="btn btn-buy">购买</div>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    data () {
      return {

      }
    },
    methods:{
			addCart(){
				this.$emit('addCart')
			}
    }
  }
</script>

<style scoped>
	#DetailBottomBar {
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		height: 58px;
		background-color: #fff;
		display: flex;
		text-align: center;
	}
		.bot-left,.bot-right{
			flex: 1;
			display: flex;
		}
		.icon{
			flex: 1;
			margin-top: 10px;
			width: 40px;
			height: 50px;
			
		}
		.png{
			margin: 0 auto;
			width: 20px;
		}
		.png img{
			width: 100%;
			vertical-align: middle;
		}
		.text{
			margin-top: 5px;
		}
		.btn{
			flex: 1;
		}
		.btn-cart{
			padding-top: 20px;
			color: black;
			background-color:#F9CD0B ;
		}
		.btn-buy{
			padding-top: 20px;
			color: #fff;
			background-color: var(--color-high-text);
		}
</style>