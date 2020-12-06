<template>
  <div class="carousel-demo">
    <button @click="autoPlay = !autoPlay">播放切换</button>
    <button @click="interval -= 100">延时改变</button>
    <button @click="type = type ? '' : 'card'">延时类型</button>
    <button @click="changeScale">更改scale</button>
    <button @click="directionChange">更改轮播方向</button>
    <button @click="triggerChange">更改指示器触发事件方式</button>
    <Carousel
      :auto-play="autoPlay"
      :interval="interval"
      :type="type"
      :scale="scale"
      :trigger="trigger"
      :direction="direction"
      @change="change"
    >
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
    const imgList = [
      require('../assets/img/junliang.jpg'),
      require('../assets/img/junliang.jpg'),
      require('../assets/img/junliang.jpg'),
      require('../assets/img/junliang.jpg'),
    ]
    const autoPlay = ref(false)
    const interval = ref(3000)
    const type = ref('card')
    const trigger = ref('hover')
    const scale = ref(0.8)
    const direction = ref('horizontal')
    function changeScale() {
      scale.value *= 0.9
    }
    function directionChange() {
      direction.value = direction.value === 'horizontal' ? 'vertical' : 'horizontal'
    }
    function change(value) {
      // console.log(value);
    }

    function triggerChange() {
      trigger.value = trigger.value === 'hover' ? 'click' : 'hover'
    }

    return {
      changeScale,
      trigger,
      triggerChange,
      imgList,
      autoPlay,
      interval,
      type,
      scale,
      direction,
      directionChange,
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
