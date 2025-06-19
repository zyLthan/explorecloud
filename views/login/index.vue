
<template>
  <div class='login'>

    <!-- 头部NavBar -->
      <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.push('/home')" />
      <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model='pictureCode' class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if='pictureCodeUrl' :src='pictureCodeUrl' @click='getPictureCode()' alt="">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" maxlength="6" placeholder="请输入短信验证码" type="text">
          <button @click='getTextCode'>{{!this.timer?'获取验证码':second+'秒后重新发送'}}</button>
        </div>
      </div>

      <div class="login-btn" @click='getLogin'>登录</div>
    </div>
    <!-- 主体 -->
  </div>
</template>

<script>
import { getLoginAPI, getPictureAPI, getMsgCodeAPI } from '@/api/login'// 导入login.js接口

// import { toast } from 'vant' 配合 toast()

export default {
  name: 'loginIndex', // 不配名字报错
  data () {
    return {
      pictureCode: '',
      pictureKey: '',
      pictureCodeUrl: '',
      totalSeconds: 60,
      second: 60,
      timer: null, // 定时器名字
      mobile: '',
      smsCode: ''
    }
  },
  async created () {
    // console.log(await getPictureAPI())
    // const { data: { base64, key } } = await getPictureAPI()
    // console.log(base64, key)

    // 一渲染完就调用
    this.getPictureCode()
  },
  methods: {
    // 获取图片验证码
    async getPictureCode () {
      const { data: { base64, key } } = await getPictureAPI()/// 解构data里的base64和key在这vue中可以使用
      this.pictureCodeUrl = base64
      this.pictureKey = key
      // this.$toast('获取图形验证码成功')/// 挂在了vue原型上--Vue.prototype.$toast=xxx
    },
    checkNumberAndTextcode () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast.fail('请输入正确手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.pictureCode)) {
        this.$toast.fail('请输入正确验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getTextCode () {
      // 获取验证码之前需校验手机号，图片验证码是否正确
      if (!this.checkNumberAndTextcode()) {
        return false
      }

      if (!this.timer) { /// this.timer是空的null才执行
        // 发送请求
        await getMsgCodeAPI(this.pictureCode, this.pictureKey, this.mobile)

        this.$toast.success('短信发送成功')

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSeconds
          }/// 节流操作
        }, 1000)
      }
    },
    // 登录接口
    async getLogin () {
      if (!this.checkNumberAndTextcode()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast.fail('请输入正确的短信验证码')
        return
      }
      const result = await getLoginAPI(this.mobile, this.smsCode)
      if (result.status === 500) {
        this.$toast.fail(result.message)
        return
      }
      this.$store.commit('user/setUserInfo', result.data)// 调用modules/user中的mutations方法
      // 将result.data作参数用到user/setUserInfo方法

      const url = this.$route.query.backUrl
      if (url) {
        this.$router.replace(url)
      } else {
        this.$router.push('/home/user')
      }

      // this.$router.push('/home/user')
      this.$toast.success('登录成功')
    }

  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #a4b812;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#19b284,#559f0c);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
