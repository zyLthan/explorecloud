
<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>

    <van-tabbar v-model="active" active-color="#123456" route>
  <van-tabbar-item replace to='/home' icon="shop">首页</van-tabbar-item>
  <van-tabbar-item replace to='/home/category' icon="hot" dot>分类</van-tabbar-item>
  <van-tabbar-item replace to='/home/shopcart' icon="shopping-cart" :badge="cartTotal>0?cartTotal:''">购物车</van-tabbar-item>
  <van-tabbar-item replace to='/home/user' icon="user" :badge="orderBadge > 0 ? orderBadge : ''">我的</van-tabbar-item>
</van-tabbar>
  </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'layOutIndex', // 不配名字报错
  computed: {
    ...mapGetters('cart', ['cartTotal']),
    ...mapState('user', ['payment', 'delivery', 'received']),
    orderBadge () {
      return this.payment + this.delivery + this.received
    }
  }
}
</script>

<style>

</style>
