<template>
<div class="bav-bar">
  <div class="left"><slot name="left"></slot></div>
  <div class="center"><slot name="center"></slot></div>
  <div class="right"><slot name="right"></slot></div>
</div>
</template>

<script>
  export default {
  name: 'NavBar',
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
.bav-bar{
  display: flex;
  line-height: 44px;
  text-align: center;
}
.left,.right{
  width: 60px;
  /* background-color: aquamarine; */
}
.center{
  flex: 1;
  /* background-color: darkgoldenrod; */
}
</style>