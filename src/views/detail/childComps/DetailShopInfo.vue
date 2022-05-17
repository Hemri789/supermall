<template>
  <div v-if="Object.keys(shops).length!==0">
    <div class="logo">
      <img :src="shops.logo" alt="">
      <p class="logo-text">{{shops.name}}</p>
      
    </div>
    <div class="shop-data">
      <div class="left-data">
        <div class="sells">
          <div class="data-num">{{shops.sells|sellsFilter}}</div>
          <div class="data-text">总销量</div>
        </div>
        <div class="cGoods">
          <div class="data-num">{{shops.cGoods}}</div>
          <div class="data-text">全部宝贝</div>
        </div>
        <div class="fans">
          <div class="data-num">{{shops.fans|sellsFilter}}</div>
          <div class="data-text">粉丝数</div>
        </div>
      </div>
      <div class="right-data">
        <div class="score" v-for="(item,index) in shops.score" :key="index">
          <span class="score-name">{{item.name}}</span>
          <span class="score-num" :class="{active:item.isBetter}">{{item.score}}</span>
          <span class="score-bg" :class="{active:item.isBetter}">{{item.isBetter?'高':'低'}}</span>
        </div>
      </div>
    </div>
    <div class="shop-url">进店逛逛</div>
    <div class="meassage"></div>
  </div>
</template>

<script>
  export default {
    name: 'DetailShopInfo',
    props:{
      shops:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      sellsFilter(value){
        if(value < 10000) return value
        return (value/1000).toFixed(1)+'万'
      }
    }
  }
</script>

<style scoped>
.logo{
  display: flex;
  margin: 20px 5px 0 10px;
}
  .logo img{
    width: 50px;
  }
  .logo-text{
    margin: 20px 0 0 10px;
  }
.shop-data{

  display: flex;
  height: 80px;
  margin: 5px 10px 0 10px;
  /* border: 1px solid #ccc */
}
  .left-data{
    display: flex;
    justify-content: space-between;
    width: 180px;
    text-align: center;
    height: 50px;
    margin: 20px 0 20px 0;
    padding:5px 10px 0 0 ;
    border-right: 1px solid #ccc;
  }
    .data-num{
      font-size: 15px;
    }
    .data-text{
      margin-top:3px ;
      font-size:12px ;
      color: rgb(148, 143, 143);
    }
.right-data{
    margin: 10px 0 0 15px;
  }
  .score{
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin:7px 0 5px 0;
    font-size: 12px;
  }
  .score span{
    margin-right: 5px;
  }
  .score-num,.score-bg{
    color: #5ea732;
  }
 .active{
    color: #f13e3a;
  }
.shop-url{
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  width: 90px;
  border-radius: 10px;
  background-color: #ededed;
}
.meassage{
  margin-top: 20px;
    border-bottom: 10px solid #ededed;
}
</style>