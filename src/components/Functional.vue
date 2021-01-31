<script>
import { h } from "vue";

  function render(props, context) {
    return h(`h${props.value}`, { class: 'box' }, context.slots.a(4564645))
  }

  render.props = ['value']
  
  export default render
</script>