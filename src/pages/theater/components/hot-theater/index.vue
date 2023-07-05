<template>
    <view class="theater-hot-therter">
        <f-title title="热播剧场" :icon="imageTheater.rebojuchang"></f-title>
        <swiper
            class="swiper"
            :circular="true"
            :vertical="false"
            :autoplay="autoplay"
            :duration="duration"
            display-multiple-items="2"
            next-margin="50px"
        >
            <swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
                <div class="swiper-item__content" @click="toPlayPage(item)">
                    <image :src="item.coverImg" alt="" class="swiper-item__content__img" />
                    <div class="swiper-item__content__info glass"></div>
                    <div class="swiper-item__content__info">
                        <view class="swiper-item__content__info__name">{{ item.name }}</view>
                        <view class="swiper-item__content__info__text">{{ filtersUpdateStatus(item.updateStatus) }}共{{ item.totalNum }}集</view>
                    </div>
                </div>
            </swiper-item>
        </swiper>
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

// 自动播放
const autoplay: boolean = false
// 滑动动画时长
const duration: number = 300
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
.theater-hot-therter {
    width: 100vw;
    .swiper {
        margin-left: 30rpx;
        height: 400rpx;
        &-item {
            &__content{
                margin-right: 30rpx;
                border-radius: 18rpx;
                border: 1px solid #e6e6e6;
                position: relative;
                height: 400rpx;
                width: 260rpx;
                overflow: hidden;
                &__img{
                    width: 100%;
                    min-height: 100%;
                }
                &__info{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 98rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    &__name{
                        color: #333;
                        font-size: 28rpx;
                        font-weight: 500;
                        margin-left: 20rpx;
                    }
                    &__text{
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #666666;
                        margin-left: 20rpx;
                    }
                }
                .glass{
                    background: #ccc;
                    z-index: 0;
                    opacity: 0.9;
                    backdrop-filter: blur(10px);
                }
            }
        }
    }
}
</style>
