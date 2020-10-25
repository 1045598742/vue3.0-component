<template>
  <div class="carousel-demo">
    <button @click="autoPlay = !autoPlay">播放切换</button>
    <button @click="interval += 100">延时改变</button>
    <Carousel :auto-play="autoPlay" :interval="interval">
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
    const imgList = reactive([
      require('../assets/img/shuihu(1).jpg'),
      require('../assets/img/shuihu(2).jpg'),
      require('../assets/img/shuihu(3).jpg'),
    ])
    const autoPlay = ref(true)
    const interval = ref(1000)
    return {
      imgList,
      autoPlay,
      interval
    }
  }
})
</script>

<style lang="scss">
  .carousel-demo {
    width: 500px;
    height: 300px;
    margin: 50px auto 0;
  }
  .lb-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
