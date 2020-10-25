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
  <div class="hehe">
    <button @click="hehe">复制图片</button>
   <img
    @blur="blur"
    @focus="focus"
    src="http://www.baidu.com/img/flexible/logo/pc/result.png"
    alt="http://www.baidu.com/img/flexible/logo/pc/result.png"
   />
   <p>尝试拖动图片至word</p>
   <p>点击我再粘贴试试</p>
  </div>
 </div>
</template>
<script>
import { defineComponent, nextTick, onMounted } from 'vue'

export default defineComponent({
 setup() {
  const getSelect = (targetNode) => {
   if (window.getSelection) {
    //chrome等主流浏览器
    // console.log(document.getSelection);
    var selection = window.getSelection()
    var range = document.createRange()
    range.selectNode(targetNode)
    selection.removeAllRanges()
    selection.addRange(range)
    // console.log(window.getSelection)
   } else if (document.body.createTextRange) {
    //ie
    var range = document.body.createTextRange()
    range.moveToElementText(targetNode)
    range.select()
   }
  }
  // const clipboardHandler = (nodeName, event) => {
  //  event = event || nodeName //不传参时
  //  const type = Object.prototype.toString
  //   .call(nodeName)
  //   .replace(/\[object\s|\]/g, '')
  //  const target = event.target || event.srcElement

  //  var result = false;
  //  switch (type) {
  //   case 'String':
  //    result = target.nodeName.toLowerCase() === nodeName
  //    break
  //   case 'Array':
  //    result = nodeName.some((item) => target.nodeName.toLowerCase() === item)
  //    break
  //   case 'Object':
  //    nodeName = null;
  //   default:
  //    result = target.nodeName === 'IMG'
  //  }
  //  if (result) {
  //    console.log(document.querySelectorAll('.hehe img')[0])
  //   getSelect(target)
  //   document.execCommand('copy')
  //  }
  // }

  function hehe() {
    const node = document.querySelector('.hehe img')
    getSelect(node)
    document.execCommand('copy')
    setTimeout(() => {
      node.blur()
    }, 1000)
  }

  function blur() {
    alert(55)
  }
  function focus() {
    alert(566)
  }
  onMounted(() => {
  //绑定事件
  // var img = document.querySelectorAll('img')[0]
  // img.addEventListener('click', clipboardHandler)

  // var pHandler = clipboardHandler.bind(null, 'p')
  // var div = document.querySelectorAll('div')[0]
  // div.addEventListener('click', pHandler)
  })
  return {
    hehe,
    blur,
    focus
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
