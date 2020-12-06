<template>
  <transition name="lb-carousel">
    <div
      v-show="isShow"
      :class="[
        'lb-carousel__item',
        $parent.direction,
        { prev: $parent.operation === 'prev'},
        { card: $parent.type === 'card' && $parent.direction === 'horizontal'}
      ]"
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
    const { ctx: { $parent }, proxy } = getCurrentInstance()
    const index = ref($parent.childNum || 0)
    const attrs = ref({})
    $parent.childNum = index.value + 1
    const isShow = computed(() => {
      if ($parent.type === 'card' && $parent.direction === 'horizontal') return true
      return $parent.activeIndex === index.value
    })

    const type = computed(() => $parent.type)
    const direction = computed(() => $parent.direction)
    watch([type, direction], () => {
      styleComputed()
    }, { immediate: true })

    function styleComputed(a, b) {
      if ($parent.type === 'card' && $parent.direction === 'horizontal') {
        nextTick(() => { // 防止初次渲染获取不到transformObj的值， 所以加nextTick
          const style = computed(() => {
            return ($parent.transformObj[index.value] || $parent.transformObj.other).style
          })
          attrs.value.style = style
        })
      } else {
        attrs.value = {}
      }
    }

    return {
      isShow,
      index,
      attrs
    }
  }
})
</script>
