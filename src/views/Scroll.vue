<template>
  <ScrollCom>
    <div>
      <p v-for="i in num" :key="i" style="width: 100%">{{ i }}</p>
    </div>
  </ScrollCom>
</template>
<script>
import { ref, defineComponent } from 'vue'
import ScrollCom from '@/components/Scroll'
export default defineComponent({
  components: {
    ScrollCom
  },
  setup(prop, context) {
    const num = ref(0)
    setTimeout(() => {
      num.value = 100
    }, 1500)
    setTimeout(() => { 
      num.value = 200
    }, 3000)
    return {
      num
    }
  }
})
</script>