<!-- 充值记录 -->
<template>
  <view class="rechargeRecords">
    <scroll-view 
      scroll-y="true" 
      class="scroll-Y" 
      @scrolltolower="lower" 
      refresher-enabled="true" 
      @refresherrefresh="refresher" 
      :refresher-triggered="triggered" 
      @refresherrestore="onRestore" 
      @refresherabort="onAbort"
    >
      <div class="list">
        <div class="list__Item" v-for="(item, index) in list" :key="index">
          <view class="list__Item__text">
            <view class="list__Item__text__name">微信充值 {{ item.amount }}元</view>
            <view class="list__Item__text__time">支付时间：{{ item.createTime }}</view>
          </view>
          <view class="list__Item__niuAmount">+{{ item.niuAmount + (item.giveAmount || 0) }}牛币</view>
        </div>
        <uni-load-more
          iconType="auto"
          :status="refresherFlag?'more':'noMore'"
          :content-text="refresherFlag?'上拉加载更多':'-到底了-'"
        >
        </uni-load-more>
      </div>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import {ref} from 'vue'

// 消费记录
let list: any = ref([])
let page: any = ref(1)
let triggered = ref(false)
let refresherFlag: any = ref(true) // true 允许加载，false 不允许加载
const gitRechargeRecords = () => {
    const params = {
      page: page.value,
      pageSize: 10
    }
    request.post('/recharge/record/pageList',params).then((res: any) => {
        if(res.code === '00-00-0000') {
          list.value = res.data.content
          triggered.value = false
          if((res.data.totalElements < 10) && ((res.data.number * res.data.size) >= res.data.totalElements)) { // 上拉可以加载更多
            console.log('49')
            refresherFlag.value = false
          }
        }
        console.log('93', res)
    })
}
gitRechargeRecords()

// 滚动到底部
const lower = () => {
	console.log('滚动到底部')
  if(refresherFlag.value){
    page.value += 1
    gitRechargeRecords()
  }
}

// 下拉刷新
const refresher = () => {
	console.log('下拉刷新')
  page.value = 1
  gitRechargeRecords()
  refresherFlag.value = true
  triggered.value = true
}
// 自定义下拉刷新被复位
const onRestore = () => {
	console.log('自定义下拉刷新被复位')
}
// 自定义下拉刷新被中止
const onAbort = () => {
	console.log('自定义下拉刷新被中止')
}
</script>

<style lang="scss">
.rechargeRecords {
  background-color: #F6F6F6;
  .list{
    height: 100vh;
    padding: 30rpx 30rpx 0 30rpx;
    &__Item{
      display: flex;
      padding: 0 30rpx;
      height: 150rpx;
      margin-bottom: 30rpx;
      background: #fff;
      align-items: center;
      justify-content: space-between;
      &__text{
        &__name{
          font-size: 34rpx;
          color: #ff0000;
          font-weight: bold;
          margin-bottom: 14rpx;
        }
        &__time{
          font-size: 28rpx;
          font-weight: 400;
          color: #333333;
        }
      }
      &__niuAmount{
        color: #333;
        font-size: 34rpx;
        font-weight: bold;
      }
    }
  }
}

</style>