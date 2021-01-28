<template>
 <div id="nav">
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/input">Input</router-link> |
  <router-link to="/scroll">Scroll</router-link> |
  <router-link to="/carousel">carousel</router-link>
  <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view> -->
  <router-view />
 </div>
</template>
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
  .scroll-bar-x {
    height: 10px;
    border-radius: 5px;
    background: blueviolet;
    position: absolute;
    bottom: 0;
  }
  .box {
    // height: 100%;
    overflow: scroll;
    margin-right: -17px;
    margin-bottom: -17px;
    max-height: 400px;
  }
}
#app {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
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
