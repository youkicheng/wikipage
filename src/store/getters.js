export default {
  exploreList (state) {
    return state.randomList.map(data => {
      let { pageid, title, extract, thumbnail, isCollected } = data
      thumbnail = thumbnail && thumbnail.source
      return {
        id: pageid,
        title,
        extract,
        isCollected,
        thumbnail
      }
    })
  },
  topTopicList (state) {
    const { hotTitleItems } = state
    return hotTitleItems.map(item => {
      let { pageid, title, extract, thumbnail } = item
      return {
        id: pageid,
        title,
        extract,
        thumbnail
      }
    })
  }
}
