<template>
    <div class="count-box">
        <button @click='handleSub' class='minus'>-</button>
        <input :value="value" @change='handleChange' class='inp' type="text">
        <button @click='handleAdd' class='add'>+</button>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value === 1) {
        this.$toast('已经是最小数量')
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      if (this.value >= 100) {
        this.$toast('超过最大购买限制')
        return
      }
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value
      if (num > 100) {
        e.target.value = this.value
        this.$toast('超过最大购买限制')
        return
      }
      if (isNaN(num) || num <= 0) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }

}
</script>

<style lang='less' scoped>
.count-box{
    width: 110px;
    display: flex;
    .add,.minus{
        width: 30px;
        height: 30px;
        outline: none;
        border: none;
    }
}
.inp{
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
}
</style>
