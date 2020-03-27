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
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
           </div>
         </div>

         <div class="tile is-parent">
           <div class="tile is-child box">
             <p> Five </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
             <p> Four </p>
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
          navItems: [
            {
              id:1,
              title:'热门板块',
              list: [
                {
                src: require('../assets/icon/js.png'),
                    name:'前端',
                    url:'/article/js'
                },
                {
                    src: require('../assets/icon/back.png'),
                    name:'后端',
                    url:'/article/back',

                },
                {
                    src: require('../assets/icon/ai.png'),
                    name:'人工智能',
                    url:'/article/ai',
                    hot:true
                },
                {
                    src: require('../assets/icon/area.png'),
                    name:'区块链',
                    url:'www.baidu.com'
                },
                {
                    src: require('../assets/icon/wx.png'),
                    name:'小程序',
                    url:'www.baidu.com'
                },
                {
                    src: require('../assets/icon/safe.png'),
                    name:'安全',
                    url:'www.baidu.com'
                },
                {
                    src: require('../assets/icon/ios.png'),
                    name:'ios',
                    url:'www.baidu.com'
                },
                {
                    src: require('../assets/icon/tool.png'),
                    name:'工具',
                    url:'www.baidu.com'
                },
              ]
            },
          ],



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
    margin-left: 125px;
    margin-right: 125px;
  }


</style>
