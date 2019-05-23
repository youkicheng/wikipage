<template>
  <div class="wiki">
    <div class="content" v-if="wikiPage">
      <p
        v-for="item of wikiContent.sections"
        :key="`sections${item.id}`"
        v-html="item.text"
      ></p>
      <p
        v-for="item of wikiContent.remaining"
        :key="`remaining${item.id}`"
        v-html="item.text"
      ></p>
    </div>
    <div class="loadding" v-if="!hideLoadingPage">
      <Icon type="loading" class="icon"></Icon>
    </div>
    <div
      class="collectItem"
      :class="{isCollected: wikiContent.isCollected}"
      v-if="wikiPage"
      @click="collectItem"
    >{{wikiContent.isCollected ? '已收藏' : '收藏该词条'}}</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Icon from '_c/Icon'
export default {
  name: 'wiki',
  props: ['title'],
  components: {
    Icon
  },
  data () {
    return {
      hideLoadingPage: false
    }
  },
  watch: {
    wikiContent () {
      if (!this.hideLoadingPage) {
        this.$nextTick()
          .then(() => {
            this.hideLoadingPage = true
            let { id, title } = this.wikiContent
            this.$local.recordHistory(id, title)
          })
      }
    }
  },
  computed: {
    ...mapState({
      wikiPage: state => state.wiki.wikiPage
    }),
    ...mapGetters(['wikiContent'])
  },
  methods: {
    ...mapActions(['dispatchWikiPageAjax']),
    ...mapMutations(['getWikiPage', 'toggleWikiCollectedStatus']),
    collectItem () {
      const { set, remove } = this.$local
      const { id, title, isCollected } = this.wikiContent
      if (isCollected) {
        remove(id)
        this.toggleWikiCollectedStatus(false)
      } else {
        set(id, title)
        this.toggleWikiCollectedStatus(true)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.$bus.$emit('showBoxShadow', true)
      vm.$bus.$emit('showHomeIcon', false)
      vm.dispatchWikiPageAjax(vm.title)
    })
  }
}
</script>

<style scoped>
  @import '../assets/css/wikiMobileBase.css';
</style>

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
  .wiki
    margin-top 10px
    margin-bottom 48px
    position relative
    padding 20px
    width 100%
    min-height 100vh
    overflow hidden
    .loadding
      width 100%
      min-height calc(100vh - 98px)
      background-color #fff
      position absolute
      top 0
      left 0
      .icon
        position absolute
        top 50%
        left 50%
        margin-left -15px
        margin-top -15px
        font-size 30px
        animation loading 2s infinite linear
    .collectItem
      width 32%
      height 36px
      background-color #fff
      border-radius 5px
      margin 0 auto
      text-align center
      line-height 36px
      box-shadow 0 0 1px 1px #999
      color #666
      letter-spacing 1px
    .isCollected
      background-color $isActiveColor
      box-shadow 0 0 1px 1px #ececec
      color #fff
</style>
