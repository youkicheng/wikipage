export default {
  getRandomData (state, data) {
    state.randomList.push(data)
  },
  getHotTitleData (state, data) {
    state.hotTitleItems = data
  },
  getDataError (state) {
    state.dataError = true
  }
}
