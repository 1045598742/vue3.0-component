<template>
  <div
    class="lb-input"
    :class="{ 'lb-input-padding-prev': prevIcon, 'lb-input-padding-next': nextIcon || clearable }"
  >
    <template v-if="type === 'text' || type === 'number'">
      <i
        clear="clear"
        v-show="clearable && value"
        class="lb-input-icon lb-icon-clear"
        @click="$emit('update:value', '')"
      ></i>
      <i v-if="prevIcon" class="lb-input-icon-prev" :class="[prevIcon]"></i>
      <input
        v-bind="bindProps"
        class="lb-input_inner"
        @input="inputEvent($event, 'input')"
        @change="inputEvent($event, 'change')"
        @focus="inputEvent($event, 'focus')"
        @blur="inputEvent($event, 'blur')"
      />
      <i v-if="nextIcon && !clearable" class="lb-input-icon-next" :class="[nextIcon]"></i>
    </template>
    <textarea
      v-if="type === 'textarea'"
      v-bind="bindProps"
      class="lb-textarea_inner"
      @input="inputEvent($event, 'input')"
      @change="inputEvent($event, 'change')"
      @focus="inputEvent($event, 'focus')"
      @blur="inputEvent($event, 'blur')"
    />
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: "LbInput",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number,Object],
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: ''
    },
    minlength: {
      type: [String, Number],
      default: ''
    },
    min: {
      type: [String, Number],
      default: ''
    },
    max: {
      type: [String, Number],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    prevIcon: {
      type: String,
      default: ''
    },
    nextIcon: {
      type: String,
      default: ''
    },
    rows: {
      type: [Number,String],
      default: '10'
    },
    cols: {
      type: [Number,String],
      default: '50'
    },
    resize: {
      type: String,
      default: ''
    },
  },
  emits: ['update:value', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const bindProps = computed(() => {
      let { clearable, resize, ...surplusProps } = props
      let obj = {};
      Object.keys(surplusProps).forEach(e => {
        if (surplusProps[e] !== '') {
          obj[e] = props[e]
        }
      })
      if (props.type !== 'textarea') {
        delete obj.cols
        delete obj.rows
      }
      if (props.type === 'textarea' && props.resize !== '') {
        obj.style = `resize:${props.resize}`
      }
      return obj
    })

    function inputEvent(ev, listenerName) {
      if (listenerName === 'input') {
        emit('update:value', ev.target.value)
      }else if (listenerName === 'change') {
        emit('change', ev.target.value)
      } else {
        emit(listenerName, ev)
      }
    }

    return {
      bindProps,
      inputEvent
    }
  }
})
</script>