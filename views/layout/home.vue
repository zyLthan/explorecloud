<template>
  <div class='home'>
    <!-- 导航栏nav-bar -->
    <van-nav-bar title="逛云商城"/>
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请在此输入搜索关键词"
      @click="$router.push('/search')"
    />
  <van-swipe class='my_swipe' :autoplay="2500" indicator-color="white">
    <van-swipe-item><img src='@/assets/swipe1.png'></van-swipe-item>
    <van-swipe-item><img src='@/assets/swipe2.png'></van-swipe-item>
    <van-swipe-item><img src='@/assets/swipe3.png'></van-swipe-item>
    <van-swipe-item><img src='@/assets/swipe4.png'></van-swipe-item>
    <van-swipe-item><img src='@/assets/swipe5.png'></van-swipe-item>
  </van-swipe>
  <van-grid square column-num="5" icon-size="40">
    <van-grid-item
    v-for="item in navList"
    :key="item.imgUrl"
    :icon="item.imgUrl"
    :text="item.text"
    @click="$router.push('/home/category')"
    />
    </van-grid>
    <div class="main">
      <img src="@/assets/main.png">
      <img src="@/assets/main1.png" alt="">
    </div>
    <div class="guess">
        <p class="guess-title">—— 猜你喜欢 ——</p>
        <div class="goods-list">
          <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item='item'></GoodsItem>
        </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'homeIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      navList: [],
      goodsList: []
    }
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.navList = pageData.items[3].data
    this.goodsList = pageData.items[6].data
  }
}
</script>

<style>
.van-nav-bar__content {
  background-color: #C91623;
}
.my_swipe .van-swipe-item {
  height: 220px;
  color: #C91623;
  font-size: 20px;
  text-align: center;
  background-color: #f1f1f2;
}
.my_swipe .van-swipe-item img {
  width: 100%;
  height: 220px;
}
.main img{
  width: 100%;
}
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #C91623;
}

.goods-list {
  background-color: #f6f6f6;
}
</style>
