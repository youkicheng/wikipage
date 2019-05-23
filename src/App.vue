<template>
  <div id="app">
    <Header></Header>
    <keep-alive exclude="wiki">
      <router-view/>
    </keep-alive>
    <nav id="nav">
      <router-link to="/home" class="home">
        <Icon type="viewgallery" class="home-icon"></Icon>
        <div class="home-info">主页</div>
      </router-link>
      <router-link to="/search" class="search">
        <Icon type="search" class="search-icon"></Icon>
      </router-link>
      <router-link to="/collection" class="collection" exact>
        <Icon type="similarproduct" class="collection-icon"></Icon>
        <div class="collection-info">收藏</div>
      </router-link>
    </nav>
  </div>
</template>
<script>
import Header from '@/views/Header'
import Icon from '_c/Icon'
export default {
  components: {
    Header,
    Icon
  }
}
</script>
<style lang="stylus" scoped>
  @import '~@/assets/stylus/variable.styl'
  #nav
    width 100%
    height 50px
    position fixed
    z-index 999
    left 0
    bottom 0
    display flex
    justify-content space-around
    align-items center
    border-top solid 1px #ccc
    background-color #fff
    & > *
      width 50px
      text-decoration none
      color #333
      font-size 10px
      font-weight 600
      transition all 0.2s ease-out
      border-radius 100%
      .home-icon, .collection-icon
        font-size 22px
        display block
        margin 0 auto
      .home-info, .collection-info
        margin-top 2px
        text-align center
    .is-active
      color $isActiveColor
    .search
      height 52px
      width 52px
      position relative
      box-shadow 0 0 5px 2px #aaa
      background-color #fff
      border-radius 50%
      align-self flex-end
      margin-bottom 2px
      color #333
      &:active
        background-color #ececec
        box-shadow 0 0 5px 1px #999
      .search-icon
        font-size 22px
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        margin auto
</style>
