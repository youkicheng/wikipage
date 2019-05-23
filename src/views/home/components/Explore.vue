<template>
  <div class="explore" ref="explore">
    <ul class="data-wrapper" v-if="exploreList.length >= 3">
        <li v-for="data of exploreList" :key="data.id" class="data">
          <router-link :to="{path: `/wiki/${data.title}`}" class="link">
            <h2 class="title">{{data.title}}</h2>
            <img
              :src="data.thumbnail"
              alt="图片异常"
              class="img"
              v-if="data.thumbnail"
            >
            <div class="extract">{{data.extract}}</div>
          </router-link>
        </li>
        <li class="loadingmore">
          <Icon type="loadingmore" class="icon"></Icon>
        </li>
    </ul>
    <div class="loadding" v-else>
      <Icon type="loading" class="icon"></Icon>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '_c/Icon'
export default {
  name: 'explore',
  components: {
    Icon
  },
  data () {
    return {
      loaddingTime: 0,
      getDataFlag: false,
      getPageHeightInterval: null,
      pageHeight: 360,
      throttleGetMoreExploreDataFunc: null
    }
  },
  computed: {
    ...mapGetters(['exploreList'])
  },
  watch: {
    pageHeight (newVal) {
      this.$emit('updaPageHeight', newVal)
    }
  },
  methods: {
    ...mapActions(['dispatchExploreDataAjax']),
    scrollAtBottom () {
      // 获取当前滚动条的位置
      function _getScrollTop () {
        let scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        return scrollTop
      }
      // 获取当前可视范围的高度
      function _getClientHeight () {
        let clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
        } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
        }
        return clientHeight
      }
      // 取文档内容实际高度
      function _getScrollHeight () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      }
      // 判断距离底部是否只有 100
      function _scrollAtBottom () {
        if (_getScrollTop() + _getClientHeight() >= _getScrollHeight() - 100) {
          return true
        } else {
          return false
        }
      }
      return _scrollAtBottom()
    },
    getMoreExploreData () {
      if (this.scrollAtBottom()) {
        if (this.throttleGetMoreExploreDataFunc == null) {
          this.throttleGetMoreExploreDataFunc = this.$throttle(this.dispatchExploreDataAjax, 1000, { leading: true, trailing: false })
        }
        this.throttleGetMoreExploreDataFunc()
      }
    },
    getPageHeightInRealTime () {
      this.getPageHeightInterval = setInterval(() => {
        this.pageHeight = Math.ceil(this.$refs.explore.getBoundingClientRect().height)
      }, 500)
    },
    clearGetPageHeightInRealTime () {
      clearInterval(this.getPageHeightInterval)
      this.getPageHeightInterval = null
    },
    activePageChange () {
      this.$emit('activePageChange', 'explore')
    }
  },
  created () {
    this.getDataFlag = true
    this.dispatchExploreDataAjax()
  },
  activated () {
    this.activePageChange()
    this.$emit('updaPageHeight', this.pageHeight)
    window.addEventListener('scroll', this.getMoreExploreData)
    !this.getDataFlag && this.dispatchExploreDataAjax()
    this.getPageHeightInRealTime()
  },
  deactivated () {
    window.removeEventListener('scroll', this.getMoreExploreData)
    this.clearGetPageHeightInRealTime()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/variable.styl'
  @keyframes loading {
    from {
      transform rotate(0deg)
    }
    to {
      transform rotate(360deg)
    }
  }
  .explore
    width 100%
    position absolute
    .data-wrapper
      width 100%
      list-style none
      margin 0
      padding 8px 0
      background-color #ececec
      .data
        padding 18px
        margin-bottom 8px
        background-color #fff
        overflow hidden
        box-shadow 0 1px 2px 0px #999
        position relative
        .link
          text-decoration none
          color #000
          .title
            font-size 16px
            margin-top 2px
          .img
            height 80px
            float right
            margin 2px 0 2px 10px
            border-radius 5px
          .extract
            color #666
            font-size 13px
            letter-spacing 1px
            line-height 16px
      .loadingmore
        width 100%
        height 60px
        background-color #fff
        position relative
        .icon
          position absolute
          top 50%
          left 50%
          margin-left -15px
          margin-top -15px
          font-size 30px
          animation loading 2s infinite linear
          border-radius 50%
          padding 5px
          box-shadow 0 1px 5px 0px #999
    .loadding
      width 100%
      min-height calc(100vh - 132px)
      background-color #fff
      position relative
      .icon
        position absolute
        top 50%
        left 50%
        margin-left -15px
        margin-top -15px
        font-size 30px
        animation loading 2s infinite linear
</style>
