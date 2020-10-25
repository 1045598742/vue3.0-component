<template>
  <div class="lb-carousel" @mouseenter="clearTimer" @mouseleave="autoPlayFn">
    <div class="lb-carousel__arrow left" @click="activeChange('prev')"></div>
    <div class="lb-carousel__arrow right" @click="activeChange('next')"></div>
    <slot />
    <ul class="lb-carousel__indicator">
      <li v-for="i in childNum" :key="i" :class="{ active: activeIndex === i-1 }" @mouseenter="activeIndexChange(i - 1)"></li>
    </ul>
  </div>
</template>
<script>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick, watch } from 'vue'

export default defineComponent({
  name: 'Carousel',
  props: {
    autoPlay: { // 是否自动播放
      type: Boolean,
      default: true
    },
    interval: { // 轮播延时
      type: Number,
      default: 3000
    },
    direction: { // 轮播主轴
      type: String,
      default: 'horizontal' // horizontal vertical
    },
    type: { // 轮播类型 3d模式还是默认单张
      type: String,
      default: '3D' // default 3D
    },
  },
  setup(props, context) {
    const childNum = ref(0)
    const activeIndex = ref(0)
    const operation = ref(null)
    let timer = null
    /**
     * 清理自动轮播定时器
     */
    function clearTimer() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    /**
     * 自动轮播
     */
    function autoPlayFn() {
      clearTimer()
      if (!props.autoPlay) return
      timer = setInterval(() => {
        activeChange('next')
      }, props.interval >= 500 ? props.interval : 500)
    }

    watch(() => props.autoPlay, autoPlayFn, { immediate: true })
    watch(() => props.interval, autoPlayFn)

    /**
     * 触发轮播图索引改变前的索引计算
     * @param type prev上一步 next下一步
     */
    function activeChange(type) {
      operation.value = type
      let futureIndex = null
      if (type === 'next') {
        futureIndex = activeIndex.value + 1
        activeIndexChange(futureIndex < childNum.value ? futureIndex : 0, true)
      } else {
        futureIndex = activeIndex.value - 1
        activeIndexChange(futureIndex >= 0 ? futureIndex : childNum.value - 1, true)
      }
    }

    /**
     * 改变索引进行轮播
     * @param index 变化的目标索引
     * @param auto 是否是定时器触发的轮播
     */
    function activeIndexChange(index, auto) {
      if (index === activeIndex.value || index >= childNum.value) return // 传入的索引是当前索引或者索引比当前最大索引大不做任何处理
      if (index < childNum.value) {
        if (!auto) operation.value = index < activeIndex.value ? 'prev' : 'next'
        nextTick(() => {
          activeIndex.value = index
        })
      }
    }
    return {
      activeIndex,
      childNum,
      activeChange,
      operation,
      clearTimer,
      autoPlayFn,
      activeIndexChange
    }
  }
})
</script>

<style lang="scss">
  .lb-carousel { // 组件根元素
    width: 100%;
    height: 300px;
    position: relative;
    user-select: none;
    overflow: hidden;
    &__arrow { // 箭头样式
      position: absolute;
      top: 50%;
      background-color: red;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      transform: translateY(-50%);
      z-index: 2;
      cursor: pointer;
      &.left { // 左箭头
        left: 5px;
      }
      &.right { // 右箭头
        right: 5px;
      }
    }
    &__indicator { // 指示器
      display: flex;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      li {
        margin: 0 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: sandybrown;
        cursor: pointer;
        &.active {
          background-color: white;
        }
      }
    }
  }
</style>
