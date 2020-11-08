import Vue from 'vue'
import Vuex from 'vuex'
import Parser from 'rss-parser'

let parser = new Parser()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    feeds: {},
    sources: [
      'https://buttondown.email/alpinejs/rss',

    ],
  },
  mutations: {
    setFeedsData(state, data) {
      state.cards = data
    },
    processFeed(state, item) {
      state.feeds = Object.assign({}, state.feeds, { [item.url]: item.items })
    },
    showError(state, error) {
      state.loading = false
      state.error = error
    },
    toggleLoading(state) {
      state.loading = !state.loading
    }
  },
  actions: {
    get({ commit }, source) {
      commit('toggleLoading')

      let feedItem = {
        url: source,
        items: []
      }

      parser.parseURL(source, (err, feed) => {
        if (err) {
          commit('addError', err)
        }

        feed.items.forEach(entry => {
          feedItem.items.push({
            author: entry.author,
            title: entry.title,
            link: entry.link,
            date: new Date(entry.pubDate),
          })
        })

        commit('addToFeed', feedItem)
        commit('toggleLoading')
      })
    },
    init({ dispatch }) {
      this.state.sources.forEach(source => {
        dispatch('get', source)
      })
    }
  },
  modules: {
  }
})
