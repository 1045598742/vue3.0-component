<template>
  <div ref="outer" class="a">
    <div
      ref="barY"
      v-show="scrollHeight > 0"
      :style="{ height: scrollHeight + 'px', transform: `translateY(${translateY}px)`}"
      class="scroll-bar-y"
      @mousedown="mousedown"
    ></div>
    <div ref="main" class="box" :class="{ 'has-scroll': scrollHeight }" @scroll="scroll">
      <div ref="warpper" class="inner">
        <p v-for="i in num" :key="i">454</p>
        <p>777</p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
export default defineComponent({
  setup() {
    const barY = ref(null)
    const warpper = ref(null)
    const main = ref(null)
    const outer = ref(null)
    const scrollHeight = ref(0)
    const translateY = ref(0)
    const num = ref(0)
    let boxHeight = 0
    let allHeight = 0
    let flag = true
    Promise.resolve().then(() => {
      setTimeout(() => {
        num.value = 100
      }, 3000)
    })
    onMounted(() => {
      computedScrollStyle()
      observer()
    })

    function computedScrollStyle() {
      const { parentNode } = barY.value
      allHeight = warpper.value.scrollHeight
      boxHeight = parentNode.offsetHeight
      if (allHeight > boxHeight) {
        scrollHeight.value = boxHeight / allHeight * boxHeight
      } else {
        scrollHeight.value = 0
      }
    }

    function observer() {
      computedScrollStyle()
      const targetNode = barY.value.parentNode
      const config = { attributes: false, childList: true, subtree: true }
      function callback(mutationsList, observer) {
        computedScrollStyle()
      }
      const resizeObserver = new ResizeObserver(callback)
      resizeObserver.observe(targetNode)
      const mutationObserver = new MutationObserver(callback)
      mutationObserver.observe(targetNode, config)
    }

    function scroll(ev) {
      if (!flag) return
      const { scrollTop } = ev.target
      translateY.value = scrollTop / allHeight * boxHeight
    }

    function mousedown(ev) {
      flag = false
      const {offsetY } = ev
      const { top: elPageY } = outer.value.getBoundingClientRect()
      const maxHeight = boxHeight - scrollHeight.value
      function mousemove(event) {
        const { pageY: mousePageY } = event
        const { offsetTop } = ev.target
        let newValue = mousePageY - elPageY - offsetY
        if (newValue <= 0) newValue = 0
        if (newValue >= maxHeight) newValue = maxHeight
        translateY.value = newValue
        main.value.scrollTop = newValue / maxHeight * (allHeight - boxHeight)
      }
      window.addEventListener('mouseup', () => {
        flag = true
        window.removeEventListener('mousemove', mousemove)
      })
      window.addEventListener('mousemove', mousemove)
    }
    return {
      num,
      outer,
      barY,
      main,
      warpper,
      scroll,
      scrollHeight,
      translateY,
      mousedown
    }
  }
})
</script>