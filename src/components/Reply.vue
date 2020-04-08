<template>
  <article class="media reply_all">
    <figure class="media-left author_info">
      <router-link :to="{name:'userInfo', params:{userID:reply.author.id, userName:reply.author.name}}">
        <el-avatar :size="50" :src="reply.author.profileSrc"></el-avatar>
        <p>{{reply.author.name}}</p>
      </router-link>
    </figure>

    <div class="media-content reply_main">
      <div class="reply_info">
        <span>{{reply.number}}楼</span>
        <span> {{reply.time}}</span>
      </div>

      <div class="icon_btn">
        <el-tooltip class="item" effect="light" content="赞同" placement="top">
          <el-button class="like_button" :class="{liked: reply.isLiked}" type= "text" size="mini" icon="el-icon-caret-top">{{reply.liked}}</el-button>
        </el-tooltip>
      </div>

      <div class="reply_content">
        <p class="to_reply" v-if="reply.to">{{reply.to}}</p>
        <div v-html="reply.content" style="margin-left: 6px;"></div>
        <div v-if="reply.reward" style="margin-top: 10px; margin-left: 4px;">
          <span class="reply_reward">
            <span v-if="reply.reward.type == 'best'">最佳回答奖励:+{{reply.reward.number}}</span>
            <span v-else-if="reply.reward.type == 'helpful'">热心回答奖励:+{{reply.reward.number}}</span>
          </span>
        </div>
      </div>
      <div class="reply_tool">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-share">分享</el-dropdown-item>
            <el-dropdown-item icon="el-icon-warning-outline">举报</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip class="item" effect="light" content="回复" placement="top">
          <el-button style="border:none;" icon="el-icon-chat-square" size="small" circle></el-button>
        </el-tooltip>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        reply: {
          content: '我也不知道是为啥，帮顶',
          author: {
            id: 111,
            profileSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            name: 'hhxlz',
          },
          number: 2,
          time: '2020-04-07 22:21',
          to: '回复 大佬(1L)：',
          liked: 3,
          isLiked: false,
          reward: {
            type: 'best',
            number: '50',
          },
      },
      }
    }
  }
</script>

<style scoped>
  .reply_all {
    border-bottom: 1px solid #cccccc;
    background-color: #eeeeee;
  }
  .reply_main {
    background-color: white;
    margin-left: -14px;
    padding-left: 4px;
  }
 .author_info {
   font-size: 12px;
   text-align: center;
   padding: 4px 4px 0 4px;
   width: 80px;
  }
  .author_info p {
    color: #000000;
  }
  .author_info p:hover {
    color: #0000FF;
  }
  .author_info a:hover{
    text-decoration: underline;
  }

  .reply_info {
    display: inline-block;
    font-size: 12px;
    color: #838383;
    height: 26px;
    line-height: 26px;
  }

  .icon_btn {
    float: right;
  }
  .like_button {
    color: #949494;
    margin-right: 4px;
   }
   .like_button:hover{
     color: #8d9eff;
   }
   .liked {
     color: #0084FF;
   }
  .reply_content {
    min-height: 80px;
    padding-top: 4px;
    border-top: 1px solid #cccccc;
  }
  .to_reply {
    font-size: 16px;
    color: #bbbbbb;
    font-weight: bold;
  }
  .reply_tool {
    text-align: right;
  }
  .reply_reward {
    border: 1px solid #000000;
    border-radius: 30px;
    padding: 4px;
    box-shadow: 2px 2px 2px #888888;
    font-size: 13px;
  }
</style>
