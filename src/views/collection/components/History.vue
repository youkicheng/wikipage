<template>
  <div class="history">
    <ul class="history-list">
      <li v-for="item of historyList" :key="item.id">
        <div class="record-time">
          <div>{{new Date(item.recordTime).toLocaleString().match(/^(.+)\s(.+)$/)[1]}}</div>
          <div>{{new Date(item.recordTime).toLocaleString().match(/^(.+)\s(.+)$/)[2]}}</div>
        </div>
        <router-link :to="{path: `/wiki/${item.title}`}" class="link">
          <span class="title">{{item.title}}</span>
        </router-link>
      </li>
      <li class="clear-history" @click="clearHistory">清空浏览记录</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    historyList: {
      type: Array
    }
  },
  methods: {
    clearHistory () {
      this.$local.removeHistoryList()
      this.$emit('clearHistory')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/variable.styl'
  .history
    width 100%
    flex-shrink 0
    .history-list
      list-style none
      margin 0
      padding 0
      li
        margin 10px 12px
        height 50px
        border-bottom 1px solid #ccc
        overflow hidden
        .record-time
          font-size 12px
          color $isActiveColor
          height 100%
          float left
          text-align center
          display flex
          flex-direction column
          justify-content center
          > *
            height 30%
        .link
          text-decoration none
          width 100%
          height 100%
          display block
          .title
            font-size 18px
            color #666
            line-height 50px
            margin-left 20px
      .clear-history
        line-height 42px
        text-align center
        letter-spacing 1px
        &:active
          color #666
</style>
