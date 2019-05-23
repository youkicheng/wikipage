<template>
  <div class="favorites">
    <ul class="favorites-list">
      <li
        v-for="(item, index) of favoritesList"
        :key="item[0]"
        :ref="`favoritesItem${index}`"
        @touchstart="longPressDeleteTitle(index, item[0])"
        @touchend="isLongPress(index)"
        @click="gotoWiki(item[1])"
      >
        <span class="icon-wrapper">
          <Icon type="navlist" class="icon"></Icon>
        </span>
        <span class="title">{{item[1]}}</span>
      </li>
    </ul>
    <div class="cover" :class="{'show-cover':showCover}">
      <div class="confirm-box">
        <div class="confirm-info">
          你确定要删除选中的条目吗?
        </div>
        <div class="button">
          <button class="confirm" @click="confirm">确定</button>
          <button class="cancel" @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '_c/Icon'
export default {
  props: {
    favoritesList: {
      type: Array
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      deleyDeleteEvent: null,
      selectedId: null,
      selectedIndex: null,
      showCover: false
    }
  },
  methods: {
    longPressDeleteTitle (index, id) {
      this.deleyDeleteEvent = setTimeout(() => {
        this.$refs[`favoritesItem${index}`][0].style.backgroundColor = '#ccc'
        this.selectedId = id
        this.selectedIndex = index
        this.showCover = true
      }, 800)
    },
    isLongPress (index) {
      if (!this.showCover) {
        this.$refs[`favoritesItem${index}`][0].style.backgroundColor = '#fff'
      }
      clearTimeout(this.deleyDeleteEvent)
      this.deleyDeleteEvent = null
    },
    confirm () {
      this.$emit('deleteItem', this.selectedIndex)
      this.$local.remove(this.selectedId)
      this.selectedId = null
      this.selectedIndex = null
      this.showCover = false
    },
    cancel () {
      this.$refs[`favoritesItem${this.selectedIndex}`][0].style.backgroundColor = '#fff'
      this.selectedId = null
      this.selectedIndex = null
      this.showCover = false
    },
    gotoWiki (title) {
      this.$router.push(`/wiki/${title}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/variable.styl'
  .favorites
    width 100%
    flex-shrink 0
    .favorites-list
      list-style none
      margin 0
      padding 0
      li
        margin 10px 12px
        height 50px
        line-height 50px
        border-bottom 1px solid #ccc
        overflow hidden
        .link
          text-decoration none
          width 100%
          height 100%
          display block
        .icon-wrapper
          color $isActiveColor
          font-size 22px
          padding 10px
          border-radius 50%
        .title
          font-size 18px
          color #666
    .cover
      width 100vw
      height 100vh
      background-color rgba(0, 0, 0, 0.1)
      position fixed
      z-index 9
      top 0
      left 0
      display none
      &.show-cover
        display block
      .confirm-box
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 60%
        height 120px
        background-color #fff
        border-radius 6px
        display flex
        flex-direction column
        justify-content space-around
        font-size 15px
        align-items center
        box-shadow 0 0 15px 1px #999
        .button
          .confirm, .cancel
            outline none
            padding 10px
            border none
            background-color #fff
            letter-spacing 2px
            &:active
              color #999

</style>
