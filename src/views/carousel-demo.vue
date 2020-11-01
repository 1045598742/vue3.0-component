<template>
  <div class="carousel-demo">
    <button @click="autoPlay = !autoPlay">播放切换</button>
    <button @click="interval -= 100">延时改变</button>
    <button @click="type = type ? '' : 'card'">延时类型</button>
    <button @click="addPic">增加图片</button>
    <Carousel :auto-play="autoPlay" :interval="interval" :type="type" @change="change">
      <CarouselItem v-for="(img, index) in imgList" :key="index">
        <img :src="img" />
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import Carousel from '@/components/Carousel/index.vue'
import CarouselItem from '@/components/Carousel/carousel-item.vue'
export default defineComponent({
  components: {
    Carousel,
    CarouselItem
  },
  setup() {
    const imgList = []
    const componentsRequire = require.context('@/assets/img', false, /\.jpg$/)
    componentsRequire.keys().forEach(src => {
      imgList.push(componentsRequire(src))
    })
    const autoPlay = ref(false)
    const interval = ref(3000)
    const type = ref('card')
    function addPic() {
      imgList.splice(1, 0, require('../assets/img/junliang.jpg'))
    }
    function change(value) {
      // console.log(value);
    }
    return {
      addPic,
      imgList,
      autoPlay,
      interval,
      type,
      change
    }
  }
})
</script>

<style lang="scss">
  .carousel-demo {
    width: 100%;
    margin: 50px auto 0;
  }
  .lb-carousel__item {
    border-radius: 8px;
    overflow: hidden;
  }
  .lb-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
