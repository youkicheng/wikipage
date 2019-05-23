<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${type}`"></use>
  </svg>
</template>

<script>
import '@/assets/font/svg'
export default {
  props: {
    type: String
  }
}
</script>

<style lang="stylus" scoped>
  .icon
    width 1em
    height 1em
    vertical-align -0.15em
    fill currentColor
    overflow hidden
</style>
