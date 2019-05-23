<template>
  <div class="search">
    <div class="search-header">
      <div class="icon-wrapper" @click="goHome">
        <Icon type="home" class="icon"></Icon>
      </div>
      <input
        type="text"
        placeholder="请输入要查询的内容"
        class="search-input"
        ref="searchInput"
        @input="getSearchRealtedTitle"
        v-model="inputVal"
      >
      <span class="cancel" @click="fallback">取消</span>
    </div>
    <div class="search-tips">
      <div class="search-hot">
        <div class="search-hot-toggle" @click="toggleHotItem">
          <Icon type="refresh" class="icon" ref="searchToggleIcon"></Icon>
          <span>换一批</span>
        </div>
        <div class="search-hot-headline">热门搜索</div>
        <ul>
            <li
              v-for="item of searchTipsDisplayHotItems"
              :key="item.id"
            >
              <router-link :to="`/wiki/${item.title}`" class="link">
                {{item.title}}
              </router-link>
            </li>
        </ul>
      </div>
      <div class="search-history">
        <div class="search-history-clear" @click="clearSearchHistory">
          <Icon type="delete" class="icon"></Icon>
          <span>清空历史搜索</span>
        </div>
        <div class="search-history-headline">历史搜索</div>
        <ul>
          <li
            v-for="item of searchTipsDisplaySearchHistoryItems"
            :key="item.id"
          >
            <router-link :to="`/wiki/${item.title}`" class="link">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="search-related" v-show="searchRealtedOnlyTitleItems.length">
      <ul class="search-related-items">
          <li
            v-for="item of searchRealtedOnlyTitleItems"
            :key="item.id"
            class="search-related-item"
            @click="gotoWiki(item.id, item.title)"
          >
            {{item.title}}
          </li>
      </ul>
      <div class="black" @click="clearSearchData"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Icon from '_c/Icon'
export default {
  components: {
    Icon
  },
  data () {
    return {
      searchTipsPage: 0,
      searchHistoryList: [],
      inputVal: '',
      throttleGetSearchRealtedTitleFunc: null
    }
  },
  activated () {
    this.inputAutofocus()
    this.dispatchHotAjax()
    this.getSearchHistoryList()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'wiki') {
      this.clearSearchData()
    }
    next()
  },
  computed: {
    ...mapGetters(['hotOnlyTitleItems', 'searchRealtedOnlyTitleItems']),
    searchTipsDisplayHotItems () {
      let { searchTipsPage, hotOnlyTitleItems } = this
      return hotOnlyTitleItems.slice(searchTipsPage * 8, (searchTipsPage + 1) * 8)
    },
    searchTipsDisplaySearchHistoryItems () {
      return this.searchHistoryList.slice(0, 8)
    }
  },
  methods: {
    ...mapActions(['dispatchHotAjax', 'dispatchSearchRelatedAjax']),
    ...mapMutations(['clearSearchRelatedData']),
    goHome () {
      this.$router.push('/home')
    },
    inputAutofocus () {
      this.$nextTick()
        .then(() => {
          this.$refs.searchInput.focus()
        })
    },
    fallback () {
      this.$router.go(-1)
    },
    toggleHotItem () {
      this.searchTipsPage = (this.searchTipsPage + 1) % (Math.floor(this.hotOnlyTitleItems.length / 8))
      let degMatch = this.$refs.searchToggleIcon.$el.style.transform.match(/\d+/)
      let deg = Number((degMatch ? degMatch[0] : 0)) + 360
      this.$refs.searchToggleIcon.$el.style.transform = `rotate(${deg}deg)`
    },
    getSearchRealtedTitle (e) {
      if (this.throttleGetSearchRealtedTitleFunc == null) {
        const func = (e) => { this.dispatchSearchRelatedAjax(e.target.value) }
        this.throttleGetSearchRealtedTitleFunc = this.$throttle(func, 300, { leading: true })
      }
      this.throttleGetSearchRealtedTitleFunc(e)
    },
    clearSearchData () {
      this.inputVal = ''
      this.clearSearchRelatedData()
    },
    addSearchHistory (id, title) {
      this.$local.recordSearchHistory(id, title)
    },
    getSearchHistoryList () {
      this.searchHistoryList = Object.values(this.$local.getSearchHistoryList())
      this.searchHistoryList.sort((a, b) => Number(b.recordTime) - Number(a.recordTime))
    },
    clearSearchHistory () {
      this.$local.removeSearchHistoryList()
      this.getSearchHistoryList()
    },
    gotoWiki (id, title) {
      this.addSearchHistory(id, title)
      this.$router.push(`/wiki/${title}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search
    width 100%
    min-height calc(100vh - 60px)
    position absolute
    top 0
    left 0
    z-index 9
    background-color #fff
    .icon-wrapper
      height 36px
      width 42px
      position absolute
      .icon
        margin 9px 12px
        color #666
        font-size 18px
    .search-header
      width 100%
      display flex
      align-items flex-start
      height 48px
      padding 6px 10px
      box-shadow 0 1px 2px 0px #999
      position fixed
      top 0
      overflow hidden
      z-index 1
      background-color #fff
      .search-input
        flex-grow 1
        height 36px
        border-radius 6px
        font-size 16px
        background-color #fff
        box-shadow inset 0 0 5px 1px #ccc
        border none
        padding 0 42px
        outline none
        &::-webkit-input-placeholder
          color #999
          padding-left 5px
        &:focus
          box-shadow inset 0 0 5px 1px #999
      .cancel
        padding 0 10px
        height 36px
        line-height 36px
        letter-spacing 2px
        color #333
        &:active
          color #999
    .search-tips
      font-size 12px
      position relative
      top 48px
      overflow hidden
      .search-hot
        margin 20px
        .search-hot-toggle
          float right
          font-size 13px
          padding 5px
          cursor pointer
          .icon
            margin 0 10px
            transform rotate(0)
            transition all 0.2s ease-out
        .search-hot-headline
          font-weight 600
          font-size 13px
          padding 5px
        ul
          list-style none
          overflow hidden
          margin 0
          padding 0
          li
            float left
            background-color #ececec
            border-radius 1px
            margin 18px 20px 0 0
            .link
              text-decoration none
              display block
              padding 9px
              color #000
      .search-history
        margin 20px
        .search-history-clear
          float right
          padding 5px
          cursor pointer
          .icon
            margin 0 5px
        .search-history-headline
          font-weight 600
          font-size 13px
          padding 5px
        ul
          list-style none
          overflow hidden
          margin 0
          padding 0
          li
            width 100%
            border-bottom 1px solid #ececec
            .link
              text-decoration none
              display block
              width 100%
              padding 12px 5px
              color #000
              &:active
                background-color #ececec
    .search-related
      position absolute
      top 52px
      left 0
      width 100%
      min-height calc(100vh - 50px)
      background-color #fff
      display flex
      flex-direction column
      .search-related-items
        margin 0
        list-style none
        padding 10px 20px 20px 20px
        width 100%
        .search-related-item
          border-bottom 1px solid #ececec
          color #666
          width 100%
          overflow hidden
          padding 10px
      .black
        flex-grow 1
</style>
