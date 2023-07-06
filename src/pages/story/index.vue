<template>
  <view class="story">
    <scroll-view 
      scroll-y="true" 
      class="scroll-Y" 
      :refresher-enabled="true" 
      :refresher-triggered="triggered"
      @scrolltolower="lower" 
      @refresherrefresh="refresher" 
      @refresherrestore="onRestore" 
      @refresherabort="onAbort"
    >
      <view class="story__list">
        <view class="story__list__item" v-for="(item, index) in list" :key="index">
            <view class="story__list__item__imgwrap">
              <image :src="item.coverImg" alt="" class="story__list__item__img" />
            </view>
            <view class="story__list__item__content">
              <view class="story__list__item__content__name">{{ item.name }}</view>
              <view class="story__list__item__content__info">
                <text>{{ filtersUpdateStatus(item.updateStatus) }}</text>
                共{{ item.totalNum }}集
              </view>
              <view class="story__list__item__content__briefIntroduction">
                简介：{{ item.briefIntroduction }}
              </view>
            </view>
        </view>
        <uni-load-more :status="refresherFlag?'more':'noMore'"></uni-load-more>
    </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import request from '@/utils/request'
import { filtersUpdateStatus } from '@/utils/dict'
// 最新剧场
let list: any = ref([])
let page: any = ref(1)
let refresherFlag: any = ref(true) // true 允许加载，false 不允许加载
const getLatest = () => {
    request.post('/fnjc/filmMain/getList',{page: page.value, pageSize: 10}).then((res: any) => {
        if(res.code === '00-00-0000'){
          list.value = res.data.content
          triggered.value = false
          if((res.data.totalElements < 10) && ((res.data.number * res.data.size) >= res.data.totalElements)) { // 上拉可以加载更多
            console.log('49')
            refresherFlag.value = false
          }
        }
    })
}
getLatest()
// 滚动到底部
const lower = () => {
	console.log('滚动到底部')
  if(refresherFlag.value){
    page.value += 1
    getLatest()
  }
}
let triggered = ref(false)
// 下拉刷新
const refresher = () => {
	console.log('下拉刷新')
  page.value = 1
  refresherFlag.value = true
  getLatest()
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
.story {
  &__list{
    height: 100vh;
    padding: 40rpx 30rpx 0rpx 30rpx;
    &__item{
      display: flex;
      margin-bottom: 60rpx;
      &__imgwrap{
        width: 220rpx;
        height: 320rpx;
        overflow: hidden;
        flex-shrink: 0;
        margin-right: 40rpx;
        border-radius: 12rpx;
        border: 1px solid #e6e6e6;
      }
      &__img{
        width: 100%;
      }
      &__content{
        &__name{
          font-size: 34rpx;
          font-weight: 500;
          color: #333;
          font-weight: 500;
          margin-bottom: 16rpx;
        }
        &__info{
          color: #666;
          font-size: 28rpx;
          margin-bottom: 32rpx;
        }
        &__briefIntroduction{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
          overflow: hidden;
          font-size: 26rpx;
          font-weight: 400;
          color: #333333;
        }
      }
    }
  }
}
</style>
