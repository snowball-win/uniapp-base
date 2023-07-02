<template>
  <view class="story">
    <div class="story__item" v-for="(item, index) in list" :key="index">
        <div class="story__item__imgwrap"><image :src="item.coverImg" alt="" class="story__item__img" /></div>
        <div class="story__item__content">
          <div>{{ item.name }}</div>
          <div>
            <span>{{ item.updateStatus }}</span>
            共{{ item.totalNum }}集
          </div>
          <div>
            简介：{{ item.briefIntroduction }}
          </div>
        </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import request from '@/utils/request'
// 最新剧场
let list: any = ref([])
const getLatest = () => {
    request.post('/fnjc/filmMain/getList',{page:1, pageSize: 10}).then((res: any) => {
        list.value = res.data.content
    })
}
getLatest()
</script>

<style lang="scss">
.story {
  &__item{
    display: flex;
    &__imgwrap{
      width: 220rpx;
      height: 320rpx;
      overflow: hidden;
    }
    &__img{
      width: 100%;
    }
  }
}
</style>
