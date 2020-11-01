<template>
 <div id="nav">
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/carousel">carousel</router-link>
  <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view> -->
  <router-view />
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
      const targetNode = barY.value.parentNode
      const config = { attributes: false, childList: true, subtree: true };
      function callback(mutationsList, observer) {
        computedScrollStyle()
      }
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config); 
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


<style lang="scss">
@import "./style/index.scss";
html,
body {
 width: 100%;
}
#demo {
 overflow-x: hidden;
}
* {
 margin: 0;
 padding: 0;
}
img {
  user-select: none;
}
.a {
  // width: 500px;
  // height: 500px;
  user-select: none;
  overflow: hidden;
  background: red;
  position: relative;
  .scroll-bar-y {
    width: 10px;
    border-radius: 5px;
    background: blueviolet;
    position: absolute;
    right: 0;
  }
  .box {
    height: 100%;
    overflow: auto;
    &.has-scroll {
      margin-right: -17px;
      // margin-bottom: -17px;
    }
  }
  .inner {
    height: 400px;
  }
}
#app {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
}

#nav {
 a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
   color: #42b983;
  }
 }
}
</style>
