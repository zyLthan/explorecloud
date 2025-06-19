<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.back()" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch"
      placeholder="搜索"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click='sortByCommon'>综合</div>
      <div class="sort-item" @click='sortBySales'>销量</div>
      <div class="sort-item" @click='sortByPrices '>
        价格
        <span v-show="currentSort === 'price'">
          <span v-if="priceAsc">↑</span>
          <span v-else>↓</span>
        </span>
      </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in searchList" :key="item.goods_id" :item='item'></GoodsItem>
      <GoodsItem v-for="item in sortNameList" :key="item.goods_id" :item='item'></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getSearchList } from '@/api/searchlist'
export default {
  name: 'searchlistIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      page: 1,
      searchList: [],
      priceAsc: true,
      currentSort: '',
      originalList: []
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }

  },
  async created () {
    const { data: { list } } = await getSearchList({
      goodsName: this.querySearch,
      page: this.page
    })
    // 如果goodsName（例如'手机'）在list.data[].goods_name字符串中含有，则赋值给this.searchList
    const filteredList = list.data.filter(item => item.goods_name.includes(this.querySearch))
    this.searchList = filteredList
    // console.log(this.searchList)

    this.originalList = [...filteredList]
  },
  methods: {
    sortBySales () {
      // console.log(this.searchList[1].goods_sales)
      // if (this.searchList[0].goods_sales >= this.searchList[1].goods_sales) {

      // }
      this.searchList.sort((a, b) => {
        return b.goods_sales - a.goods_sales // 用 b - a 实现降序
      })

      // 重要！Vue 无法检测数组 sort 后的变化，需要触发更新（任选一种方式）：
      // 方式1：重新赋值（推荐）
      this.searchList = [...this.searchList]
      this.currentSort = 'sales'
    },
    sortByPrices () {
      if (this.priceAsc) {
        // 升序排序
        this.searchList.sort((a, b) => a.goods_price_min - b.goods_price_min)
      } else {
        // 降序排序
        this.searchList.sort((a, b) => b.goods_price_min - a.goods_price_min)
      }

      // 更新数组以触发视图刷新
      this.searchList = [...this.searchList]

      // 切换排序状态
      this.priceAsc = !this.priceAsc
      this.currentSort = 'price'
    },
    sortByCommon () {
      this.searchList = [...this.originalList]
      this.currentSort = 'common'
    }

  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
