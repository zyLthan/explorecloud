<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.back()" />

    <van-search v-model='searchThing' show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click='goSearch(searchThing)'>搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click='delArr' name="delete" size="16" />
      </div>
      <div class="list">
        <div class="list-item" :key='item' v-for='item in history' @click='goSearch(item)'>
          {{item}}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getHistoryList(),
      searchThing: getHistoryList()[0]
    }
  },
  methods: {
    goSearch (thing) {
      if (thing === '') {
        return
      }
      if (!this.history.includes(thing)) {
        this.history.unshift(thing)
      } else {
        this.history = this.history.filter(item => item !== thing)
        this.history.unshift(thing)
      }
      setHistoryList(this.history)
      this.$router.push(`/searchlist?search=${thing}`)
    },
    delArr () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
