<template>
<b-carousel class="news_container">
        <b-carousel-item v-for="(item, i) in addList" :key="i">
            <section :class="`hero is-small}`">
                <div class="hero-body has-text-centered">
                    <span class="image" @click="goAdd(item)">
                      <img :src='CommonUtil.baseUrl + item.imgUrl' :alt='item.newsIntro' />
                    </span>
                </div>
            </section>
        </b-carousel-item>
    </b-carousel>
</template>

<script>
  import { getHomeNewsList } from '@/api'
  export default {
    data() {
      return {
        addList: [
          // {
          //   src:require('@/assets/adds/pic1.jpg'),
          //   alt:'',
          //   url:'https://www.baidu.com'
          // },
          // {
          //   src:require('@/assets/adds/pic2.jpg'),
          //   alt:'',
          //   url:'https://www.baidu.com'
          // },
          // {
          //   src:require('@/assets/adds/pic3.jpg'),
          //   alt:'',
          //   url:'https://www.baidu.com'
          // },
          // {
          //   src:require('@/assets/adds/pic4.jpg'),
          //   alt:'',
          //   url:'https://www.baidu.com'
          // },
        ]
      }
    },
    methods: {
      goAdd(item) {
        window.open(item.toLink,'_blank')
      },
      getNews() {
        getHomeNewsList().then(response => {
          const data = response.data;
          console.log(data);
          if (data.code == '1205') {
            this.addList = data.info;
          }
        })
      }
    },
    mounted() {
      this.getNews()
    }
  }
</script>

<style scoped>
  .news_container :hover{
    cursor: pointer;
  }
</style>
