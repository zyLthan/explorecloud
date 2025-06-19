import request from '@/utils/request'
export const getAddressListAPI = () => {
  return request.get('http://smart-shop.itheima.net/index.php?s=/api/address/list')
}

export const addressAddAPI = () => {
  return request.post('http://smart-shop.itheima.net/index.php?s=/api/address/add', {
    form: {
      name: 'lzy',
      phone: '15179593213',
      region: [
        {
          value: 782,
          label: '江西省'
        },
        {
          value: 783,
          label: '宜春市'
        },
        {
          value: 785,
          label: '上高县'
        }
      ],
      detail: '敖山大道希尔顿小区4栋'
    }
  })
}

export const removeAddressAPI = (addressId) => {
  return request.post('http://smart-shop.itheima.net/index.php?s=/api/address/remove', {

    addressId: addressId

  })
}
