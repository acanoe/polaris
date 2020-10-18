import Vue from 'vue'
import Vuex from 'vuex'
import Parser from 'rss-parser'

let parser = new Parser()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sources: [
      'https://codecourse.com/api/rss/courses',
      'https://buttondown.email/alpinejs/rss'
    ],
    error: null,
    feeds: {},
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 6,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
  },
  mutations: {
    setData(state, data) {
      state.cards = data
    },
    addError(state, error) {
      state.error = error
    },
    addToFeed(state, item) {
      state.feeds = Object.assign({}, state.feeds, { [item.url]: item.items })
    },
  },
  actions: {
    get({ commit }, source) {
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
