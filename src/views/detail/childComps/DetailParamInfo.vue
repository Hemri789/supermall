<template>
  <div v-if="Object.keys(paramInfo).length !== 0" id="paramInfo">
    <table v-for="(rule,index) in paramInfo.rule" :key="index" class="rule">
      <tr v-for="(list,index) in rule" :key="index" class="rule-tr">
        <td  v-for="(item,index) in list" :key="index" class="rule-td">
          {{item}}
        </td>
      </tr>
    </table>
    <table v-for="(info,index) in paramInfo.info" :key="'info-'+index" class="info">
      <tr class="info-tr">
        <td class="info-key">{{info.key}}</td>
			  <td class="info-value">{{info.value}}</td>
      </tr> 
		</table>
    <div v-if="paramInfo.img.length !== 0" class="img">
      <img :src="paramInfo.img" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailParamInfo',
    props:{
      paramInfo:{
        type:Object,
        default(){
          return {}
        }
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
#paramInfo{
  margin: 20px 15px 0 15px;
}
  table{
    border-collapse: collapse;
    width: 100%;
  }
  .rule-tr,.info{
    display: block;
    padding: 10px 0 10px 0;
    border-bottom: 1px solid #ededed;
 
  }
  .rule-tr{
    display: flex;
  }
  .rule-td:nth-child(1),.info-key:nth-child(1){
    color: #333;
    width: 80px;
  }
  .rule-td:nth-child(n+2){
    /* width: 50px; */
    flex: 1;
  }
  .rule-tr:last-child{
    margin-bottom: 50px;
    border-bottom: 4px solid #ededed;
  }
  .info-value{
        font-size: 13px;
        color: #df0763;
    }
.img img{
  margin: 10px 10px 0 0;
  width: 100%;
}
</style>