// API存放登录页面接口

import request from '@/utils/request'

// 1.图形验证码接口
export const getPictureAPI = () => {
  return request.get('/captcha/image')
//   RETURN 必须加
}

// 2.短信验证码请求接口
export const getMsgCodeAPI = (captchaCode, captchaKey, phoneNumber) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      phoneNumber
    }
  })
}

// 3.完成登录验证接口

export const getLoginAPI = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode

    }

  })
}
