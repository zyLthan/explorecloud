import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      userInfo: getInfo(),
      payment: 0,
      delivery: 0,
      received: 0

    }
  },
  mutations: {
    // 所有mutations第一个参数都是state，第二个是payload（一个对象）
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    },
    setOrderCounts (state, payload) {
      state.payment = payload.payment
      state.delivery = payload.delivery
      state.received = payload.received
    }
  },
  actions: {

    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }

  },
  getters: {

  }
}
