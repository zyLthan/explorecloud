import request from '@/utils/request'

export const getSearchList = () => {
  const { categoryId, goodsName, page } = Object
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
