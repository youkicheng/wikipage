import axios from 'axios'

const state = {
  wikiPage: null
}

const getters = {
  wikiContent (state) {
    let { wikiPage } = state
    if (wikiPage) {
      return {
        title: wikiPage.lead.displaytitle,
        id: wikiPage.lead.id,
        isCollected: wikiPage.isCollected,
        sections: wikiPage.lead.sections,
        remaining: wikiPage.remaining.sections
      }
    }
  }
}

const mutations = {
  getWikiPage (state, data) {
    state.wikiPage = data
  },
  toggleWikiCollectedStatus (state, status) {
    state.wikiPage.isCollected = status
  }
}

const actions = {
  dispatchWikiPageAjax ({ commit }, title) {
    axios.get(`https://zh.wikipedia.org/api/rest_v1/page/mobile-sections/${title}`)
      .then((res) => {
        const { data } = res
        let id = data.lead.id
        if (localStorage.getItem(id)) {
          data.isCollected = true
        } else {
          data.isCollected = false
        }
        commit('getWikiPage', data)
      }).catch((ex) => {
        // console.info(ex)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
