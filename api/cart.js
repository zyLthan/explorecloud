import request from '@/utils/request'
export const addInShopcartAfterLoginAPI = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 购物车获取列表接口
export const getCartList = () => {
  return request.get('/cart/list')
}
// 购物车该数量接口
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 删除接口
export const delectSelect = (cartsIds) => {
  return request.post('/cart/clear', {
    cartsIds
  })
}
