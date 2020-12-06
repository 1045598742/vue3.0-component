<template>
  <div
    ref="carousel"
    :style="{ height: height }"
    :class="['lb-carousel', direction === 'vertical' ? 'vertical' : 'horizontal']"
    @mouseenter="clearTimer"
    @mouseleave="autoPlayFn"
  >
    <!-- 方向按钮（只有在横向的时候展示） -->
    <!-- 左指示器 -->
    <div v-show="direction === 'horizontal'" class="lb-carousel__arrow left" @click="arrowClick('prev')">
      <slot name="left-arrow">
        <i :class="direction === 'vertical' ? 'lb-icon-shangjiantou' : 'lb-icon-zuo'" />
      </slot>
    </div>
    <!-- 右指示器 -->
    <div v-show="direction === 'horizontal'" class="lb-carousel__arrow right" @click="arrowClick('next')">
      <slot name="right-arrow">
        <i :class="direction == 'vertical' ? 'lb-icon-xiajiantou' : 'lb-icon-you'" />
      </slot>
    </div>
    <!-- 轮播item的插槽 -->
    <slot />
    <!-- 指示器 -->
    <ul
      :class="['lb-carousel__indicator', direction === 'vertical' ? 'vertical' : 'horizontal']"
    >
      <li
        v-for="i in childNum"
        :key="i"
        :class="{ active: activeIndex === i - 1 }"
        @[triggerType]="activeIndexChange(i - 1)"
      ></li>
    </ul>
  </div>
</template>
<script>
import { defineComponent, ref, nextTick, watch, onUnmounted, onDeactivated, computed } from 'vue'
import { throttle, debounce } from '@/utils'

export default defineComponent({
  name: 'Carousel',
  props: {
    height: { // 轮播图高度
      type: String,
      default: '300px'
    },
    autoPlay: { // 是否自动播放
      type: Boolean,
      default: true
    },
    trigger: { // 指示器触发的方式
      type: String,
      default: 'hover' // hover || click
    },
    interval: { // 轮播延时
      type: Number,
      default: 3000
    },
    direction: { // 轮播主轴
      type: String,
      default: 'vertical' // horizontal || vertical
    },
    type: { // 轮播类型 3d模式还是默认单张
      type: String,
      default: '' // '' ||  card
    },
    scale: { // card模式下的两侧图片的缩放倍数
      type: Number,
      default: 0.8
    }
  },
  emits: ['change'],
  setup(props, context) {
    let width = null
    let activeX = null
    let timer = null
    const debounceEvent = debounce(resizeWidthComputed, 300)
    const childNum = ref(0)
    const activeIndex = ref(0)
    const operation = ref('next')
    const carousel = ref(null)
    const transformObj = ref(null)
    const triggerType = computed(() => props.trigger === 'hover' ? 'mouseenter' : 'click')

    watch(() => props.autoPlay, autoPlayFn, { immediate: true })
    watch(() => props.interval, autoPlayFn)
    watch(() => props.scale, () => { // 监听卡片模式下的倍数变化
      if (props.type !== 'card' && props.direction !== 'horizontal') return
      cardCom()
    })

    watch(() => props.type,
      type => {
        nextTick(eventOperation)
      }
    , { immediate: true })

    onUnmounted(() => {
      window.removeEventListener('resize', debounceEvent)
    })

    onDeactivated(() => {
      window.removeEventListener('resize', debounceEvent)
    })

    /**
     * @description 事件操作
     */
    function eventOperation() {
      if (props.type === 'card' && props.direction === 'horizontal') {
        resizeWidthComputed()
        window.addEventListener('resize', debounceEvent)
      } else {
        window.removeEventListener('resize', debounceEvent)
      }
    }

    /**
     * @description 组件宽度变化重新计算卡片动画宽度
     */
    function resizeWidthComputed() {
      const { offsetWidth } = carousel.value
      width = offsetWidth / 2 // 获取当前组件容器一半的宽度
      activeX = width / 2 // 当前主显轮播距离容器左侧的距离(轮播item正常情况的宽度)
      cardCom()
    }

    /**
     * @description 卡片模式的样式计算
     */
    function cardCom() {
      const defaultChildrenLength = context.slots.default()[0].children.length
      const operationType = operation.value // 获取操作的类型（上一步还是下一步）
      const { scale } = props // 缩放倍数
      for (let i = 0; i < defaultChildrenLength; i++) {
        const { value } = activeIndex
        const obj = {
          [value]: {
            style: `transform: translateX(${activeX}px) scale(1); z-index: 3;`
          }
        }
        if (defaultChildrenLength > 1) {
          const prev = value - 1 >= 0 ? value - 1 : defaultChildrenLength - 1
          const next = value + 1 <= defaultChildrenLength - 1 ? value + 1 : 0
          const prevX = -(activeX - activeX * scale) // 上一张轮播距离容器左侧的距离
          const nextX = width * 2 - activeX * scale - activeX // 下一张轮播距离容器左侧的距离
          Object.assign(obj, {
            [prev]: {
              style: `transform: translateX(${prevX}px) scale(${scale}); z-index: ${operationType === 'next' ? 2 : 1}`
            },
            [next]: {
              style: `transform: translateX(${nextX}px) scale(${scale}); z-index: ${operationType === 'next' ? 1 : 2}`
            },
            other: {
              style: `transform: translateX(${activeX}px) scale(${scale})`
            }
          }) 
        }
        transformObj.value = obj
      }
    }

    /**
     * @description 清理自动轮播定时器
     */
    function clearTimer() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    /**
     * @description 自动轮播
     */
    function autoPlayFn() {
      clearTimer()
      if (!props.autoPlay) return
      timer = setInterval(() => {
        activeChange('next')
      }, props.interval >= 500 ? props.interval : 500)
    }

    /**
     * @description 给组件使用者提供的切换下一张
     */
    function next() {
      activeChange('next')
    }

    /**
     * @description 给组件使用者提供的切换上一张
     */
    function prev() {
      activeChange('prev')
    }

    /**
     * @description 触发轮播图索引改变前的索引计算
     * @param type prev上一步 next下一步
     */
    function activeChange(type) {
      operation.value = type
      let futureIndex = null
      nextTick(() => {
        if (type === 'next') {
          futureIndex = activeIndex.value + 1
          activeIndexChange(futureIndex < childNum.value ? futureIndex : 0, true)
        } else {
          futureIndex = activeIndex.value - 1
          activeIndexChange(futureIndex >= 0 ? futureIndex : childNum.value - 1, true)
        }
      })
    }

    /**
     * @description 点击操作箭头（节流）
     */
    const arrowClick = throttle(activeChange, 400)

    /**
     * @description 改变索引进行轮播
     * @param index 变化的目标索引
     * @param auto 是否是定时器触发的轮播
     */
    function activeIndexChange(index, auto) {
      if (index === activeIndex.value || index >= childNum.value) return // 传入的索引是当前索引或者索引比当前最大索引大不做任何处理
      if (index < childNum.value) {
        if (!auto) operation.value = index < activeIndex.value ? 'prev' : 'next'
        nextTick(() => {
          activeIndex.value = index
          context.emit('change', index)
          if (props.type === 'card' && props.direction === 'horizontal') cardCom()
        })
      }
    }

    return {
      carousel,
      transformObj,
      activeIndex,
      childNum,
      arrowClick,
      triggerType,
      operation,
      clearTimer,
      autoPlayFn,
      activeIndexChange
    }
  }
})
</script>
