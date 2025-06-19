import { getCartList, changeCount, delectSelect } from '@/api/cart'

//
export default {
  namespaced: true,
  state () {
    return {
      cartList: []

    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const checklist = state.cartList.find(item => item.goods_id === goodsId)
      checklist.isChecked = !checklist.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartListActions (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = false
      })

      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    async delectSelectAction (context) {
      const delSelCartlist = context.getters.selectCartList
      // console.log(delSelCartlist)

      const NeedToDelectCartIds = delSelCartlist.map(item => item.id)
      // console.log(NeedToDelectCartIds)

      // await delectSelect(NeedToDelectCartIds)cartsIds
      await delectSelect(NeedToDelectCartIds)

      context.dispatch('getCartListActions')
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selectCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selectCount (state, getters) {
      return getters.selectCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的价格
    selectPrice (state, getters) {
      return getters.selectCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)// 返回一个true/false
    }
  }
}
