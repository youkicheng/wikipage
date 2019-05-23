<template>
  <div class="collection">
    <nav class="nav" ref="collection">
      <div class="favorites" @click="showFavorites">我的收藏</div>
      <div class="history" @click="showHistory">最近浏览</div>
      <div class="nav-mark" ref="collectionNavMark"></div>
    </nav>
    <div
      class="content"
      ref="collectionContent"
      @touchstart="startSwitchPage"
      @touchmove="switchPage"
      @touchend="endSwitchPage"
    >
      <Favorites :favoritesList="favoritesList" @deleteItem="deleteFavoritesItem"></Favorites>
      <History :historyList="historyList" @clearHistory="clearHistory"></History>
    </div>
  </div>
</template>

<script>
import Favorites from '_v/collection/components/Favorites'
import History from '_v/collection/components/History'
export default {
  components: {
    Favorites,
    History
  },
  data () {
    return {
      favoritesList: [],
      historyList: [],
      startPosition: null,
      endPosition: null,
      currentLeft: null
    }
  },
  methods: {
    showFavorites () {
      const { collectionNavMark, collectionContent } = this.$refs
      collectionNavMark.style.left = '2%'
      collectionContent.style.left = '0%'
    },
    showHistory () {
      const { collectionNavMark, collectionContent } = this.$refs
      collectionNavMark.style.left = '50%'
      collectionContent.style.left = '-100%'
    },
    getFavorites () {
      this.favoritesList = []
      Object.keys(localStorage).forEach(key => {
        if (key.match(/^\d+$/)) {
          this.favoritesList.push([key, JSON.parse(this.$local.get(key))])
        }
      })
    },
    getHistory () {
      this.historyList = Object.values(this.$local.getHistoryList())
      this.historyList.sort((a, b) => Number(b.recordTime) - Number(a.recordTime))
    },
    deleteFavoritesItem (index) {
      this.favoritesList.splice(index, 1)
    },
    clearHistory () {
      this.getHistory()
    },
    startSwitchPage (e) {
      this.startPosition = e.touches[0].pageX
      const { left } = this.$refs.collectionContent.style
      this.currentLeft = left ? left.match(/-*\d+/)[0] : '0'
    },
    switchPage (e) {
      const fingerPosition = e.touches[0].pageX
      let moveDistance = this.startPosition - fingerPosition
      this.$refs.collectionContent.style.left = `calc(${this.currentLeft}% - ${moveDistance}px)`
    },
    endSwitchPage (e) {
      this.endPosition = e.changedTouches[0].pageX
      let moveDistance = this.startPosition - this.endPosition
      if (Math.abs(moveDistance) > 80) {
        if (moveDistance < 0) {
          const { collectionNavMark, collectionContent } = this.$refs
          collectionNavMark.style.left = '2%'
          collectionContent.style.left = '0%'
        } else {
          const { collectionNavMark, collectionContent } = this.$refs
          collectionNavMark.style.left = '50%'
          collectionContent.style.left = '-100%'
        }
      } else {
        this.$refs.collectionContent.style.left = `${this.currentLeft}%`
      }
      this.currentLeft = null
      this.startPosition = null
      this.endPosition = null
    }
  },
  activated () {
    this.$bus.$emit('showHomeIcon', true)
    this.$bus.$emit('showBoxShadow', true)
    this.getFavorites()
    this.getHistory()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/variable.styl'
  .collection
    width 100%
    min-height calc(100vh - 98px)
    overflow hidden
    margin-top 10px
    margin-bottom 50px
    .nav
      width 100%
      display flex
      justify-content space-around
      box-shadow 0 1px 2px 0px #ccc
      position relative
      .nav-mark
        width 48%
        position absolute
        left 2%
        top calc(100% - 1px)
        height 3px
        padding 0
        background-color $isActiveColor
        transition all 0.3s ease-in
      & > *
        padding 16px
        width 48%
        text-align center
        cursor pointer
    .content
      width 100%
      min-height calc(100vh - 148px)
      display flex
      position relative
      transition all 0.3s ease-in
      left 0
</style>
