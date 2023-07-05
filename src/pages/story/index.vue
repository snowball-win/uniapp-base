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
              <view>{{ item.name }}</view>
              <view>
                <text>{{ filtersUpdateStatus(item.updateStatus) }}</text>
                共{{ item.totalNum }}集
              </view>
              <view class="story__list__item__content__briefIntroduction">
                简介：{{ item.briefIntroduction }}
              </view>
            </view>
        </view>
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
const getLatest = () => {
    request.post('/fnjc/filmMain/getList',{page:1, pageSize: 10}).then((res: any) => {
        list.value = res.data.content
        triggered.value = false
    })
}
getLatest()
// 滚动到底部
const lower = () => {
	console.log('滚动到底部')
}
let triggered = ref(false)
// 下拉刷新
const refresher = () => {
	console.log('下拉刷新')
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
        &__briefIntroduction{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
