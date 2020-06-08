<template>
 <div class="tile-margin">
   <div class="tile is-ancestor">

     <div class="tile is-parent is-vertical is-2">
       <div class="tile is-child box">
         <LeftNavTile />
       </div>

       <div class="tile is-child box">
         <LeftCorTile />
       </div>

     </div>

     <div class="tile is-vertical">
       <div class="tile is-parent">
         <div class="tile is-child box">
           <News />
         </div>
       </div>

       <div class="tile">

         <div class="tile is-parent">
           <div class="tile is-child box">
             <p>最新帖子</p>
             <ul class="postList">
               <li v-for="posting in newPostingList">
                 <strong>•</strong>
                 <router-link :to="{name:'postContent',params:{postId: posting.postId, name: posting.title}}">
                   <span class="topic_title">{{ posting.title | stringLengthConversion(50) }}</span>
                 </router-link>
                 <PostTag :putTop="posting.putTop" :putGood="posting.putGood" :tab="posting.tab" style="float: right;"></PostTag>
               </li>
             </ul>
           </div>
         </div>

         <div class="tile is-parent">
           <div class="tile is-child box">
               <p>热门帖子</p>
               <ul class="postList">
                 <li v-for="posting in hotPostingList">
                   <strong>•</strong>
                   <router-link :to="{name:'postContent',params:{postId: posting.postId, name: posting.title}}">
                     <span class="topic_title">{{ posting.title | stringLengthConversion(50) }}</span>
                   </router-link>
                   <PostTag :putTop="posting.putTop" :putGood="posting.putGood" :tab="posting.tab" style="float: right;"></PostTag>
                 </li>
               </ul>
           </div>
         </div>

       </div>
     </div>
   </div>
 </div>
</template>


<script>
  import LeftNavTile from "@/components/home/LeftNavTile.vue";
  import LeftCorTile from "@/components/home/LeftCorTile.vue";
  import News from "@/components/home/News.vue"
  import PostTag from '../post/PostTag.vue'
  import { latestPost } from '@/api'
  import { hotPost } from '@/api'
  export default {
    data() {
      return {
        hotPostingList:[

        ],
        newPostingList:[

        ]
      }
    },

    methods: {
      toPlate(item) {
        this.$router.push(item.url);
      },
      getLatestPost() {
        latestPost().then(response => {
          const data = response.data;
          if (data.code == '416') {
            this.newPostingList = data.info;
          }
        })
      },
      getHotPost() {
        hotPost().then(response => {
          const data = response.data;
          if (data.code == '417') {
            this.hotPostingList = data.info;
          }
        })
      }
    },
    mounted() {
      this.getHotPost()
      this.getLatestPost()
    },
    components: {
      LeftNavTile,
      LeftCorTile,
      News,
      PostTag,
    }

  }
</script>

<style>
  .tile-margin{
    margin-top: 10px;
    margin-left: 55px;
    margin-right: 55px;
  }
  .postList {
    text-align: left;
  }
  .postList li {
    padding-top: 5px;
  }

  .topic_title {
    color: #000000;
  }

  .postList a:hover {
    text-decoration: underline;
  }
</style>
