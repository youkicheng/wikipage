<template>
  <div class="hot-topic" ref="hotTopic">
    <div class="exhibition" v-if="exhibitionList.length && !dataError">
      <ul class="exhibitionItems">
        <li
          class="exhibitionItme"
          v-for="item of exhibitionList"
          :key="item.id"
        >
          <router-link :to="`/wiki/${item.title}`" class="link">
            <img
              :src="item.thumbnail.source"
              alt="图片加载异常"
              class="exhibitionImg"
            >
            <div class="des">
              <h4 class="title">{{item.title}}</h4>
              <div class="extract">{{item.extract}}</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="bottonFlag" v-if="exhibitionList.length && !dataError">已经到底啦~</div>
    <div class="loadding" v-if="!exhibitionList.length && !dataError">
      <Icon type="loading" class="icon"></Icon>
    </div>
    <div class="data-error" v-if="dataError">
      <h2>数据请求异常</h2>
      <img src="../../../../public/1280px-Georgia_404.svg.png" alt="">
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Icon from '_c/Icon'
export default {
  components: {
    Icon
  },
  watch: {
    pageHeight () {
      this.$emit('updaPageHeight', this.pageHeight)
    }
  },
  computed: {
    ...mapState(['dataError']),
    ...mapGetters(['topTopicList']),
    exhibitionList () {
      return this.topTopicList.filter(item => {
        let { thumbnail } = item
        return thumbnail && thumbnail.height >= thumbnail.width
      })
    },
    pageHeight () {
      return this.exhibitionList.length * 170 + 60
    }
  },
  methods: {
    ...mapActions(['dispatchHotAjax']),
    activePageChange () {
      this.$emit('activePageChange', 'hot-topic')
    }
  },
  activated () {
    this.activePageChange()
    this.$emit('updaPageHeight', this.pageHeight)
    !this.topTopicList.length && this.dispatchHotAjax()
  }
}
</script>

<style lang="stylus" scoped>
  @keyframes loading {
    from {
      transform rotate(0deg)
    }
    to {
      transform rotate(360deg)
    }
  }
  .hot-topic
    width 100%
    min-height 100vh
    position absolute
    .exhibition
      .exhibitionItems
        display flex
        flex-direction column
        width 100%
        list-style none
        margin 0
        padding 0
        .exhibitionItme
          height 170px
          .link
            text-decoration none
            color #333
            display flex
            border-bottom solid 1px #ececec
            padding 12px
            .exhibitionImg
              width 80px
              height 102px
              border-radius 3px
              margin 5px 12px 0 0
              flex-shrink 0
            .des
              width 100%
              overflow hidden
              .title
                margin 5px 10px 10px 10px
                width 100%
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
              .extract
                color #666
                font-size 12px
                background-color #ececec
                line-height 2em
                height 112px
                padding 10px
                border-radius 3px
                text-overflow -o-ellipsis-lastline
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-line-clamp 4
                -webkit-box-orient vertical
    .bottonFlag
      height 100px
      text-align center
      padding 10px
      letter-spacing 1px
      color #333
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
    .data-error
      width 100%
      min-height calc(100vh - 132px)
      position relative
      h2
        text-align center
        margin 0
        padding-top 50px
      img
        width 80%
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
</style>
