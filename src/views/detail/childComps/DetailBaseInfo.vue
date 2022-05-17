<template>
  <div v-if="Object.keys(goods).length!==0">
    <div class="title">{{goods.title}}</div>
    <div class="price-wrap">
      <div class="new-price" :style="{color:goods.discountBgColor}">{{goods.price}}</div>
      <div class="old-price">{{goods.oldPrice}}</div>
      <div class="discount-desc" :style="{backgroundColor:goods.discountBgColor}" v-if="goods.discountDesc">{{goods.discountDesc}}</div>
    </div>
    <div class="other-info">
      <div>{{goods.columns[0]}}</div>
      <div>{{goods.columns[1]}}</div>
      <div>{{goods.services[goods.services.length-1].name}}</div>
    </div>
    <div class="serves-wrap">
			<div v-for="index in goods.services.length-1" :key="index"> 
				<img :src="goods.services[index-1].icon" alt=""> 
				{{goods.services[index-1].name}}
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props:{
      goods:{
          type:Object,
          default(){
            return {}
          }
      }
    }
  }
</script>

<style scoped>
  .title{
    margin: 12px 8px 0px 8px;
  }
  .price-wrap{
    display: flex;
    margin: 12px 5px 0px 8px;
    text-align: center;
    padding-bottom:5px ;
    
  }
  .price-wrap .new-price{
    font-size:22px ;
  }
  .price-wrap .old-price{
    font-size: 15px;
    margin: 8px 0px 0px 5px;
    text-decoration: line-through;
  }
  .price-wrap .discount-desc{
    border-radius: 9px;
    margin-left: 5px;
    width: 55px;
    height: 18px;
    color: #fff;
  }
  .other-info{
    display: flex;
    color: #999;
    font-size: 13px;
    text-align: center;
    margin: 10px 5px 0 5px;
    padding-bottom: 8px;
    border-bottom:2px solid #ededed ;
  }
   .other-info div{
     flex: 1;
   }
  .serves-wrap{
    display: flex;
    font-size:12px ;
    color: #333;
    margin: 15px 5px 0 5px;
    justify-content: space-between;
    padding-bottom:15px ;
    border-bottom: 4px solid #ededed;
    text-align: center;
  }
   .serves-wrap img{
     width: 12px;
   }
</style>