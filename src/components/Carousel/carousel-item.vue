<template>
  <transition name="lb-carousel">
    <div
      v-show="isShow"
      :class="['lb-carousel__item', { prev: $parent.operation === 'prev'}, { card: $parent.type === 'card'}]"
      v-bind="attrs"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, nextTick, ref, watch } from 'vue'

export default defineComponent({
  name: 'CarouselItem',
  setup(props) {
    const { ctx: { $parent } } = getCurrentInstance()
    const index = ref($parent.childNum || 0)
    const attrs = ref({})
    $parent.childNum = index.value + 1

    const isShow = computed(() => {
      if ($parent.type === 'card') return true
      return $parent.activeIndex === index.value
    })

    watch(() => $parent.type, type => {
      if (type === 'card') {
        nextTick(() => { // 防止初次渲染获取不到transformObj的值， 所以加nextTick
          const style = computed(() => {
            return ($parent.transformObj[index.value] || $parent.transformObj['other']).style
          })
          attrs.value.style = style
        })
      } else {
        attrs.value = {}
      }
    }, { immediate: true })

    return {
      isShow,
      index,
      attrs
    }
  }
})
</script>

<style lang="scss">
  .lb-carousel {
    &__item {
      position: absolute;
      background-color: sandybrown;
      height: 100%;
      width: 100%;
      transition: transform .5s ease-out;
      &.card {
        width: 50%;
      }
    }
    &-enter-from {
      transform: translateX(100%);
      &.prev {
        transform: translateX(-100%);
      }
    }
    &-leave-to {
      transform: translateX(-100%);
      &.prev {
        transform: translateX(100%);
      }
    }
  }
</style>
