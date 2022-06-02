<template>
  <div id='CartListItem'>
    <div class="checkbox">
      <input type="checkbox" v-model="product.checked">
    </div>
    <div class="img">
      <img :src="product.image" alt="">
    </div>
    <div class="right">
      <div class="title text">{{product.title}}</div>
      <div class="desc text">{{product.desc}}</div>
      <div class="p-and-c">
        <span class="price">￥{{product.price}}</span>
        <span class="count">x{{product.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CartListItem',
    data () {
      return {

      }
    },
    props:{
      product:{
        type:Object,
        default () {
          return {}
        }
      }
    },
    methods:{
      new(){
        console.log(this.product);
      }
    }
  }
</script>

<style scoped>
#CartListItem{
  display: flex;
  height: 90px;
  border-bottom: 1px solid #ccc;
}

.checkbox{
  flex: 1;
  margin: auto 8px;
}
  .checkbox input{
    width: 20px;
    height: 20px;
    display: block;
  }
.img{
  flex: 1;
  margin-top: 3px;
  margin-top: 3px;
}
  .img img{
    width: 55px;
    border-radius: 5px;
  }
.right{
  flex: 8;
  margin-left: 10px;
}
  .text{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
  }
  .title{
    margin-top: 6px;
  }
  .desc{
    font-size: 13px;
    margin-top: 10px;
    color: #c0c0c0;
  }
  .p-and-c{
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    margin-top: 20px;
  }
  .price{

    color: #f13e3a;
  }
  .count{

  }
</style>