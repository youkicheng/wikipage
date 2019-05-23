import axios from 'axios'
export default {
  dispatchExploreDataAjax ({ commit }) {
    for (let i = 0; i < 6; i++) {
      axios.get('https://zh.wikipedia.org/api/rest_v1/page/random/summary')
        .then((res) => {
          commit('getRandomData', res.data)
        }).catch((ex) => {
          // console.info(ex)
        })
    }
  },
  dispatchHotAjax ({ commit }) {
    const yyyy = new Date().getFullYear()
    const mm = new Date().getMonth() + 1
    const dd = new Date().getDate() - 1
    axios.get(`https://zh.wikipedia.org/api/rest_v1/feed/featured/${yyyy}/${mm}/${dd}`)
      .then((res) => {
        commit('getHotTitleData', res.data.mostread.articles)
      }).catch((ex) => {
        commit('getDataError')
      })
  }
}
