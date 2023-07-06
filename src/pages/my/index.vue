<template>
  <view class="my">
    <div class="userInfo">
      <view>
        tx
      </view>
      <view class="userInfo__content">
        <button class="userInfo__content__loginBtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">去登录</button>
        <view>登录后更精彩</view>
      </view>
      <view @click="setRecharge">充值</view>
    </div>
    <div class="list">
      <div class="list__Item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
        <view class="list__Item__img">
          <image :src="item.icon" alt="" class="story__list__item__img" />
        </view>
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
import { imageMy } from '@/image/index'

interface item {
    path?: string
    icon?: string
    title?: string
}
const list: item[] = reactive([
  {
    path: 'watchRecords',
    icon: imageMy.watchRecordes,
    title: '观看记录'
  },
  {
    path: 'likeRecords',
    icon: imageMy.likeRecordes,
    title: '点赞记录'
  },
  {
    path: 'collectRecords',
    icon: imageMy.collectRecordes,
    title: '收藏记录'
  },
  {
    path: 'rechargeRecords',
    icon: imageMy.rechargeRecordes,
    title: '充值记录'
  },
  {
    path: 'consumptionRecords',
    icon: imageMy.consumptionRecordes,
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

// 用户信息
const getUserInfoData = () => {
    request.post('/staff/v1/login/getUserInfo',{}).then((res: any) => {
        console.log('93', res)
    })
}
getUserInfoData()
// 去播放页面
const toDetail = (item: any) => {
    uni.navigateTo({
        url: `./details/${item.path}/index`
    })
}
</script>

<style lang="scss">
.my {
  background-color: $bg-color;
  .userInfo{
    display: flex;
    &__content{
      &__loginBtn{
        color: #333333;
        height: 34rpx;
        line-height: 34rpx;
        font-weight: bold;
        font-size: 34rpx;
        margin: 0;
        display: inline-block;
        background: transparent;
      }
    }
  }
  .list{
    &__Item{
      display: flex;
      padding: 0 40rpx;
      height: 80rpx;
      margin-bottom: 48rpx;
      &__img{
        width: 80rpx;
        height: 80rpx;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 24rpx;
        image{
          width: 100%;
          height: 100%;
        }
      }
      &__text{
        line-height: 80rpx;
        color: #333333;
        font-size: 34rpx;
        flex: 1;
      }
      &__arrow{
        line-height: 80rpx;
        width: 40rpx;
      }
    }
  }
}

</style>
