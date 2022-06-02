<template>
  <div id="DetailCommentInfo">
    <div class="header"></div>
    <div class="comment-title">
      <div>用户评价</div>
      <div>更多 &gt;&gt;</div>
    </div>
    <!-- v-show显示三个以内，没试过，不知道行不行 -->
    <div v-for="(item, index) in commentInfo" :key="index" v-show="index < 3" class="comment-item">
      <div class="comment-user">
        <div class="user-img"><img :src="item.user.avatar" alt="" /></div>
        <div class="user-name">{{ item.user.uname }}</div>
      </div>
      <div class="user-comment">{{ item.content }}</div>
      <div v-for="(item,index) in item.images" :key="index" class="user-showImg">
				<img :src="item" alt="">
			</div>
      <div class="comment-last">
        <div class="comment-time">{{ item.created|formatDate }}</div>
        <div class="comment-style">{{ item.style }}</div>
      </div>
				
      </div>
    <div class="footer"></div>
  </div>
</template>

<script>
//时间戳
import {formatDate} from 'common/utils'

  export default {
    name: 'DetailCommentInfo',
    props:{
      commentInfo:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters: { 
      //时间戳转换
      formatDate(time) {
        const date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
/* 上下留间隔  灰色 */
.header ,.footer{
  margin-top: 20px;
  border-bottom: 10px solid #ededed;
}
.comment-title {
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ededed;
}
.comment-item{
  margin: 15px 15px 0 10px;
}
.comment-user{
  display: flex;
}
.comment-user img{
  width: 40px;
}
.user-name{
  margin:15px 0 0 15px;
  font-size: 15px;
}
.user-comment{
  font-size: 13px;
  margin: 10px  10px 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本的行数 */
  /* -webkit-line-clamp 其实是一个不规范属性，使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；*/
  -webkit-line-clamp: 2;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
}
.comment-last{
  display: flex;
  margin: 10px 10px 0 10px;
  font-size: 12px;
  color: #999;
}
.comment-time{
  width: 72px;
}
.comment-style{
  margin-left:10px ;
}
.user-showImg{
  display: inline-block;
  margin: 10px 0 0 10px;
}
.user-showImg img{
  height: 70px;
}
</style>