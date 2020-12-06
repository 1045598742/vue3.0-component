<template>
  <LbInput v-model:value.trim="value" prev-icon="lb-icon-you" clearable @focus="focus" @blur="blur" />
  <div>{{ value }}</div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import LbInput from '../components/Input/index.vue'

export default defineComponent({
  name: 'fdfdf',
  components: {
    LbInput
  },
  setup(props, context) {
    const value = ref('')
    watch(value, (inputValue) => {
      console.log(inputValue)
    })
    function focus() {
      console.log('focus')
    }
    function blur() {
      console.log('blur')
    }
    return {
      value,
      focus,
      blur
    }
  }
})
</script>
