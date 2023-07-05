<template>
    <view class="theater-latest-therter">
        <f-title title="最新剧场" :icon="imageTheater.zuixinjvchang"></f-title>
        <view class="latest-content">
            <view class="latest-content__item" v-for="(item, index) in list" :key="index" @click="toPlayPage(item)">
                <view class="latest-content__item__img">
                    <image :src="item.coverImg" alt="" />
                </view>
                <view class="latest-content__item__name">{{ item.name }}</view>
                <view class="latest-content__item__info">{{ filtersUpdateStatus(item.updateStatus) }}共{{ item.totalNum }}集</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { imageTheater } from '@/image/index'
import { filtersUpdateStatus } from '@/utils/dict'

interface Props {
    list?: any
}
const props = withDefaults(defineProps<Props>(), {
    list: ''
})
// banner 数据
const { list } = toRefs(props)

// 去播放页面
const toPlayPage = (item: any) => {
    console.log('44', item)
    console.log('45', item.filmId)
    uni.navigateTo({
        url: './play/index?filmId=' + item.filmId
    })
}

</script>

<style lang="scss">
.theater-latest-therter {
    width: 100vw;
    .latest-content{
        padding: 0 30rpx;
        display: grid;
        grid-template-columns: 1fr 1fr; // 列
        grid-column-gap: 30rpx; // 列间距
        grid-row-gap: 50rpx; // 行间距
        padding-bottom: 80rpx;
        &__item{
            overflow: hidden;
            &__img{
                overflow: hidden;
                height: 510rpx;
                margin-bottom: 26rpx;
                border: 1px solid #e6e6e6;
                border-radius: 18rpx;
                image{
                    width: 100%;
                }
            }
            &__name{
                font-size: 32rpx;
                color: #333;
                font-weight: blod;
                margin-bottom: 12rpx;
            }
            &__info{
                font-size: 24rpx;
                font-weight: 400;
                color: #666666;
            }
        }
    }
}
</style>
