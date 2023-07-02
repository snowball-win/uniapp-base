<!-- 充值记录 -->
<template>
  <view class="my">
    <div class="userInfo">
      <!-- <div @click="login">登录</div> -->
      <!-- <div @click="getUserInfo">获取用户信息</div> -->
      <button  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">去登录</button>
      <view @click="setRecharge">充值</view>
    </div>
    <div class="list">
      <div class="list__Item" v-for="(item, index) in list" :key="index">
        <view class="list__Item__img"></view>
        <view class="list__Item__text">{{ item.title }}</view>
        <view class="list__Item__arrow">></view>
      </div>
    </div>
    <recharge ref="showRecharge"></recharge>
  </view>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import {reactive, ref} from 'vue'
interface item {
    path?: string
    icon?: string
    title?: string
}
const list: item[] = reactive([
  {
    path: '',
    icon: '',
    title: '观看记录'
  },
  {
    path: '',
    icon: '',
    title: '收藏记录'
  },
  {
    path: '',
    icon: '',
    title: '充值记录'
  },
  {
    path: '',
    icon: '',
    title: '消费记录'
  },
])
// 设置登录
let params = {
  code: '',
  phoneCode: '',
  userName: '',
  avatarUrl: '',
  gender: 0
}
const login = () => {
  console.log('login')
  wx.login({
    success (res) {
      if (res.code) {
        params.code = res.code
        getUserInfo()
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}
const getUserInfo = () => {
  wx.getUserInfo({
    success: function(res) {
      console.log('25', res)
      params.userName = res.userInfo.nickName
      params.avatarUrl = res.userInfo.avatarUrl
      params.gender = res.userInfo.gender
      console.log('78params', params)
      wx.setStorageSync('userName', res.userInfo.nickName || '')
      wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl || '')
      wx.setStorageSync('gender', String(res.userInfo.gender))
      setLogin(params)
    }
  })
}
const getPhoneNumber = (e: any) => {
  login()
  params.phoneCode = e.detail.code
}
const setLogin = (params = {}) => {
    request.post('/staff/v1/login/loginOrRegisterByWx',params).then((res: any) => {
        wx.setStorageSync('token', res.data.token || '')
    })
}
const showRecharge:any = ref(null);
const setRecharge = () => {
  console.log('95', showRecharge)
  showRecharge.value.show = true
}
// 消费记录
const get111 = () => {
    const params = {
      page: 1,
      pageSize: 10
    }
    request.post('/consumption/record/pageList',params).then((res: any) => {
        console.log('93', res)
    })
}
get111()
// 充值记录
const get222 = () => {
    const params = {
      page: 1,
      pageSize: 10
    }
    request.post('/recharge/record/pageList',params).then((res: any) => {
        console.log('93', res)
    })
}
get222()
// 用户信息
const get333 = () => {
    request.post('/staff/v1/login/getUserInfo',{}).then((res: any) => {
        console.log('93', res)
    })
}
get333()
</script>

<style lang="scss">
.my {
  background-color: $bg-color;
  .list{
    &__Item{
      display: flex;
      border: 1px solid #ccc;
      padding: 0 40rpx;
      height: 80rpx;
      margin-bottom: 48rpx;
      &__img{
        width: 80rpx;
        height: 80rpx;
        border: 1px solid #ccc;
      }
      &__text{
        line-height: 80rpx;
      }
      &__arrow{
        line-height: 80rpx;
      }
    }
  }
}

</style>
