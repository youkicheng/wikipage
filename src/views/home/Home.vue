<template>
  <div class="wrapper">
    <nav class="nav">
      <router-link :to="{name: 'explore'}" class="explore" exact>
        <Icon type="ship" class="icon"></Icon>
        <span>探索</span>
      </router-link>
      <router-link :to="{name: 'hotTopic'}" class="hot-topic">
        <Icon type="hot" class="icon"></Icon>
        <span>热点</span>
      </router-link>
      <div
        class="page-flag"
        :class="{[`active-${activePage}`]: true}"
      ></div>
    </nav>
    <div
      class="home-content"
      ref="homeContent"
      @touchstart="startSwitchPage"
      @touchend="endSwitchPage"
    >
      <transition name="slide">
        <keep-alive>
          <router-view
            @updaPageHeight="updaPageHeight"
            @activePageChange="activePageChange"
          ></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Icon from '_c/Icon'
export default {
  components: {
    Icon
  },
  data () {
    return {
      startPosition: null,
      activePage: 'explore'
    }
  },
  methods: {
    activePageChange (pageName) {
      this.activePage = pageName
    },
    updaPageHeight (height) {
      this.$refs.homeContent.style.height = `${height}px`
    },
    startSwitchPage (e) {
      this.startPosition = e.touches[0].pageX
    },
    endSwitchPage (e) {
      const endPosition = e.changedTouches[0].pageX
      const { startPosition } = this
      if (endPosition - startPosition > 100) {
        this.$router.push({ name: 'explore' })
      } else if (startPosition - endPosition > 100) {
        this.$router.push({ name: 'hotTopic' })
      }
    }
  },
  activated () {
    this.$bus.$emit('showBoxShadow', false)
    this.$bus.$emit('showHomeIcon', true)
  }

}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/variable.styl'
  .explore.slide-enter,
  .explore.slide-leave-to
    transform translateX(-100%)
  .explore.slide-enter-to,
  .explore.slide-leave
    transform translateX(0%)
  .slide-enter-active
  .slide-leave-active
    transition all 0.3s ease-out
  .hot-topic.slide-enter,
  .hot-topic.slide-leave-to
    transform translateX(100%)
  .hot-topic.slide-enter-to,
  .hot-topic.slide-leave
    transform translateX(0%)
  .nav
    display flex
    justify-content space-around
    align-items center
    height 28px
    width 100%
    background-color #fff
    position sticky
    top 0
    z-index 1
    box-shadow 0 1px 2px 0px #999
    padding 25px 0 20px 0
    .explore, .hot-topic
      font-size 15px
      text-decoration none
      color #666
      font-weight 600
      padding 10px 20px
      margin 0px 20px
      transition all 0.3s ease-out
      position relative
      letter-spacing 2px
      .icon
        margin 0 10px
    .page-flag
      width 48%
      position absolute
      top calc(100% - 1px)
      height 3px
      padding 0
      background-color $isActiveColor
      transition all 0.3s ease-in
    .active-explore
      left 2%
    .active-hot-topic
      left 50%
    .is-active
      color $isActiveColor
  .home-content
    width 100%
    position relative
    overflow hidden
    min-height calc(100vh - 132px)
    margin-bottom 40px
</style>
