<template>
  <div ref="select" class="lb-select">
    <input :value="modelValue" type="text" @click="showOption">
      <transition name="fade">
        <div v-show="innerShow" class="model">
          <slot />
        </div>
      </transition>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'lb-select',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const value = ref('')
    const isMounted = ref(false)
    const show = ref(false)
    const innerShow = ref(false)
    const select = ref(null)
    return {
      value,
      show,
      innerShow,
      select,
      isMounted,
      showOption() {
        if (!isMounted.value) isMounted.value = true
        show.value = !show.value
        innerShow.value = !innerShow.value
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .lb-select {
    max-width: 200px;
    border: 1px solid red;
  }
  .model {
    max-height: 274px;
    height: 274px;
    min-width: 202px;
    background: green;
    position: absolute;
    z-index: 2000;
    transform-origin: center top;
  }

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease-in-out;
  opacity: 1;
  transform: scaleY(1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
