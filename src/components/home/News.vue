<template>
<b-carousel>
        <b-carousel-item v-for="(item, i) in addList" :key="i">
            <section :class="`hero is-small}`">
                <div class="hero-body has-text-centered">
                    <span class="image" @click="goAdd(item)">
                      <img :src='item.src' alt='item.alt' />
                    </span>
                </div>
            </section>
        </b-carousel-item>
    </b-carousel>
</template>

<script>
  export default {
    data() {
      return {
        addList: [
          {
            src:require('@/assets/adds/pic1.jpg'),
            alt:'',
            url:'https://www.baidu.com'
          },
          {
            src:require('@/assets/adds/pic2.jpg'),
            alt:'',
            url:'https://www.baidu.com'
          },
          {
            src:require('@/assets/adds/pic3.jpg'),
            alt:'',
            url:'https://www.baidu.com'
          },
          {
            src:require('@/assets/adds/pic4.jpg'),
            alt:'',
            url:'https://www.baidu.com'
          },
        ]
      }
    },
    methods: {
      getImgUrl(value) {
        return `https://picsum.photos/id/43${value}/576/400`;
      },
      goAdd(item) {
        window.open(item.url,'_blank')
      }
    }
  }
</script>

<style>
</style>
