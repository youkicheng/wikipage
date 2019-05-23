import axios from 'axios'

const state = {
  searchRealtedItems: []
}

const getters = {
  hotOnlyTitleItems (state, getters, rootState) {
    const { hotTitleItems } = rootState
    return hotTitleItems.map(item => ({
      id: item.pageid,
      title: item.title
    }))
  },
  searchRealtedOnlyTitleItems (state) {
    let { searchRealtedItems } = state
    return Object.keys(searchRealtedItems).map(key => ({
      id: searchRealtedItems[key].pageid,
      title: searchRealtedItems[key].title
    }))
  }
}

const mutations = {
  getSearchRelatedData (state, data) {
    state.searchRealtedItems = data || {}
  },
  clearSearchRelatedData (state) {
    state.searchRealtedItems = {}
  }
}

const actions = {
  dispatchSearchRelatedAjax ({ commit }, keyWords) {
    axios.get(`https://zh.m.wikipedia.org/w/api.php?origin=*&gpssearch=${keyWords}&srsearch=${keyWords || ''}&action=query&continue=&coprop=type|dim&format=json&generator=prefixsearch&gpslimit=24&gpsnamespace=0&list=search&pilimit=24&piprop=thumbnail&pithumbsize=120&prop=pageterms|pageimages|revisions|coordinates&redirects=1&rvprop=ids&srinfo=suggestion&srlimit=1&srnamespace=0&sroffset=0&srprop=&srwhat=text&wbptterms=description`)
      .then((res) => {
        let data = res.data.error ? {} : res.data.query.pages
        commit('getSearchRelatedData', data)
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
