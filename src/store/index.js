import { createStore } from 'vuex'

export default createStore({
  state: {
    basket: {
        items: [],
    },
    isAuthenticated: false,
    accessToken: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('basket')) {
        state.basket = JSON.parse(localStorage.getItem('basket'))
      } else {
        localStorage.setItem('basket', JSON.stringify(state.basket))
      }

      if (localStorage.getItem('accesToken')) {
          state.accessToken = localStorage.getItem('accessToken')
          state.isAuthenticated = true
      } else {
          state.accessToken = ''
          state.isAuthenticated = false
      } 
    },
    addToBasket(state, item) {
      const exists = state.basket.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.basket.items.push(item)
      }

      localStorage.setItem('basket', JSON.stringify(state.basket))
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, accessToken) {
        state.accessToken = accessToken
        state.isAuthenticated = true
    },  
    removeToken(state) {
        state.accessToken = ''
        state.isAuthenticated = false
    },
    clearbasket(state) {
      state.basket = { items: [] }

      localStorage.setItem('basket', JSON.stringify(state.basket))
    },
  },
  actions: {
  },
  modules: {
  }
})