<template>
    <view class="theater-menu-bar">
        <view v-for="(item, index) in videoList" :key="index" class="theater-menu-bar__item">
            <image :src="item.url" alt="图片" class="theater-menu-bar__item__img" />
            <span class="theater-menu-bar__item__text">{{ item.title }}</span>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { imageTheater } from '@/image/index'

interface videoItem {
    url?: string
    title?: string
}
let videoList: videoItem[] = reactive([
    {
        url: imageTheater.rebo,
        title: '热播',
    },
    {
        url: imageTheater.zuixin,
        title: '最新',
    },
    {
        url: imageTheater.chongzhi,
        title: '充值',
    }
])

const toDetail = (item: any): void => {
    
}

</script>

<style lang="scss">
.theater-menu-bar {
    display: flex;
    width: calc(100vw - 60rpx);
    padding: 0 30rpx;
    justify-content: space-between;
    background: #fff;
    &__item{
        background: #FFE3E3;
        width:206rpx;
        height:176rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 18rpx;
        &__img {
            width: 76rpx;
            height: 65rpx;
        }
        &__text{
            font-size: 32rpx;
            color: #333333;
            line-height: 48rpx;
        }
    }
}
</style>
