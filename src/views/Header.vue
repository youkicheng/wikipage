<template>
  <header class="header" :class="{'show-box-shadow': boxShadowStatus}">
    <div class="icon-wrapper" v-show="!homeIconStatus" @click="goBack">
      <Icon type="back" class="icon"></Icon>
    </div>
    <div v-show="homeIconStatus" class="icon-wrapper" @click="goHome">
      <Icon type="home" class="icon"></Icon>
    </div>
    <router-link to="/search" class="search">
      <div class="search-box">
        <span class="search-placeholder">搜索口袋维基</span>
        <Icon type="search" class="search-icon"></Icon>
      </div>
    </router-link>
  </header>
</template>

<script>
import Icon from '_c/Icon'
export default {
  components: {
    Icon
  },
  data () {
    return {
      homeIconStatus: true,
      boxShadowStatus: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push('/home')
    }
  },
  mounted () {
    this.$bus.$on('showBoxShadow', (status) => {
      this.boxShadowStatus = status
    })
    this.$bus.$on('showHomeIcon', (status) => {
      this.homeIconStatus = status
    })
  }
}
</script>

<style lang="stylus" scoped>
.header
  width 100%
  padding 6px 10px
  background-color #fff
  position relative
  z-index 2
  margin-bottom -10px
  &.show-box-shadow
    box-shadow 0 1px 2px 0px #999
    position sticky
    top 0
  .icon-wrapper
    height 36px
    width 42px
    position absolute
    .icon
      margin 9px 12px
      color #666
      font-size 18px
  .search
    text-decoration none
    .search-box
      height 36px
      margin 0 auto
      border-radius 6px
      text-align center
      font-size 17px
      background-color #fff
      box-shadow inset 0 0 5px 1px #ccc
      .search-placeholder
        line-height 36px
        color #999
      .search-icon
        float right
        margin 9px 12px
        color #666
        font-size 18px
</style>
