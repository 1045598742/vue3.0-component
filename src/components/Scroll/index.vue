<template>
  <div ref="outer" class="a">
    <div
      ref="verticalBar"
      v-show="verticalBarLength > 0"
      :style="{ height: `${verticalBarLength - (horizontalBarLength ? 10 : 0)}px`, transform: `translateY(${translateY}px)`}"
      class="scroll-bar-y"
      @mousedown="mousedown($event, 'vertical')"
    ></div>
    <div
      ref="horizontalBar"
      v-show="horizontalBarLength > 0"
      :style="{ width: `${horizontalBarLength - (verticalBarLength ? 10 : 0)}px`, transform: `translateX(${translateX}px)`}"
      class="scroll-bar-x"
      @mousedown="mousedown($event, 'horizontal')"
    ></div>
    <div ref="main" class="box" @scroll="scroll">
      <div ref="warpper">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
export default defineComponent({
  setup(prop, { slots }) {
    const warpper = ref(null)
    const main = ref(null)
    const outer = ref(null)
    const verticalBarLength = ref(0)
    const horizontalBarLength = ref(0)
    const translateY = ref(0)
    const translateX = ref(0)
    let boxHeight = 0
    let boxWidth = 0
    let allHeight = 0
    let allWidth = 0
    let flag = true

    onMounted(() => {
      watch(() => slots.default(), () => {
        nextTick(() => {
          computedScrollStyle()
          scroll()
        })
      })
    })



    function computedScrollStyle() {
      allHeight = warpper.value.scrollHeight
      allWidth = warpper.value.scrollWidth
      boxHeight = outer.value.offsetHeight
      boxWidth = outer.value.offsetWidth
      verticalBarLength.value = allHeight > boxHeight ? boxHeight / allHeight * boxHeight : 0
      horizontalBarLength.value = allWidth > boxWidth ? boxWidth / allWidth * boxWidth : 0
    }

    function scroll() {
      if (!flag) return
      const { scrollTop, scrollLeft } = main.value
      translateY.value = scrollTop / allHeight * boxHeight
      translateX.value = scrollLeft / allWidth * boxWidth
    }

    function mousedown(ev, type) {
      flag = false
      const {offsetY, offsetX } = ev
      const { top: elPageY, left: elPageX } = outer.value.getBoundingClientRect()
      const maxHeight = boxHeight - verticalBarLength.value
      const maxWidth = boxWidth - horizontalBarLength.value
      function mousemove(event) {
        const { pageY: mousePageY, pageX: mousePageX } = event
        if (type === 'vertical') {
          let newValue = mousePageY - elPageY - offsetY
          if (newValue <= 0) newValue = 0
          if (newValue >= maxHeight) newValue = maxHeight
          translateY.value = newValue
          main.value.scrollTop = newValue / maxHeight * (allHeight - boxHeight)
        } else {
          let newValue = mousePageX - elPageX - offsetX
          if (newValue <= 0) newValue = 0
          if (newValue >= maxWidth) newValue = maxWidth
          translateX.value = newValue
          main.value.scrollLeft = newValue / maxWidth * (allWidth - boxWidth)
        }
      }
      const mouseUpEvent = () => {
        flag = true
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseUpEvent)
      }
      window.addEventListener('mouseup', mouseUpEvent)
      window.addEventListener('mousemove', mousemove)
    }
    return {
      outer,
      main,
      warpper,
      scroll,
      verticalBarLength,
      translateY,
      horizontalBarLength,
      translateX,
      mousedown
    }
  }
})
</script>