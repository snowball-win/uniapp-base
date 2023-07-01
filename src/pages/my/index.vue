<template>
  <view class="content">
    <div @click="login">登录</div>
    <div @click="getUserInfo">获取用户信息</div>
    <button  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取用户手机号</button>
  </view>
</template>

<script setup lang="ts">
const login = () => {
  console.log('login')
  wx.login({
    success (res) {
      if (res.code) {
        console.log('13', res)
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}
const getUserInfo = () => {
  console.log('getUserInfo')
  wx.getUserInfo({
  success: function(res) {
    console.log('25', res)
    console.log('26', res.encryptedData.length)
    console.log('27', res.encryptedData)
  }
})
}
const getPhoneNumber = (e: any) => {
  console.log('33', e)
}

</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $bg-color;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

</style>
