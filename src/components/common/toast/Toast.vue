<template>
  <div id='Toast' v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props:{
      message:{
        type:String,
        default:''
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {

      }
    },
    methods:{

    }
  }
</script>

<style scoped>
#Toast{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: rgba(0,0,0,.6);
}
</style>