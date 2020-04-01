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
                 <router-link :to="{name:'post_content',params:{id:posting.id}}">
                   <span class="topic_title">{{ posting.title | stringLengthConversion(50) }}</span>
                 </router-link>
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
                   <router-link :to="{name:'post_content',params:{id:posting.id}}">
                     <span class="topic_title">{{ posting.title | stringLengthConversion(50) }}</span>
                   </router-link>
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
  import LeftNavTile from "../components/home/LeftNavTile.vue";
  import LeftCorTile from "../components/home/LeftCorTile.vue";
  import News from "../components/News.vue"

  export default {
    data() {
      return {
        hotPostingList:[
          {
            title:'文字为咋发顺丰阿斯弗？',
            type:1,
            id:1,
          },
          {
            title:'啊的设备vhi为安抚安过',
            type:2,
            id:2,
          },
          {
            title:'阿凡地方暗暗发誓',
            type:1,
            id:3,
          },
          {
            title:'而尴尬的发生?aaf巴萨巴萨的阿布萨非八十八阿萨巴斯豆瓣八十八阿萨巴斯豆瓣',
            type:1,
            id:4,
          },
          {
            title:'案发公司的',
            type:1,
            id:5,
          },
        ],
        newPostingList:[
          {
            title:'文字为咋发顺丰阿斯弗？',
            type:1,
            id:1,
          },
          {
            title:'啊的设备vhi为安抚安过',
            type:2,
            id:2,
          },
          {
            title:'阿凡地方暗暗发誓',
            type:1,
            id:3,
          },
          {
            title:'而尴尬的发生?aaf巴萨巴萨的阿布萨非八十八阿萨巴斯豆瓣八十八阿萨巴斯豆瓣',
            type:1,
            id:4,
          },
          {
            title:'案发公司的',
            type:1,
            id:5,
          },
        ]
      }
    },

    methods: {
      toPlate(item) {
        this.$router.push(item.url);
      }
    },

    components: {
      LeftNavTile,
      LeftCorTile,
      News,
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
