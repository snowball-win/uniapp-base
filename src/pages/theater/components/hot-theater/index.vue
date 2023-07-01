<template>
    <view class="theater-hot-therter">
        <content-title></content-title>
        <swiper
            class="swiper"
            :circular="true"
            :vertical="false"
            :autoplay="autoplay"
            :duration="duration"
            display-multiple-items="2"
            next-margin="50px"
            @change="changeplay"
            @touchstart="touchStart"
            @touchend="touchEnd"
        >
            <swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
                <div class="swiper-item__content">
                    <image :src="item.coverImg" alt="" class="theater-menu-bar__item__img" />
                </div>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

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
const changeplay = (res: any) => {
    console.log('34', res)
    if (touchStartPageY < touchEndPageY) {
        console.log('向下滑动')
    } else {
        console.log('向上滑动')
    }
}
let touchStartPageY: number = 0
const touchStart = (res: any) => {
    console.log('37', res)
    touchStartPageY = res.changedTouches[0].pageY
}
let touchEndPageY: number = 0
const touchEnd = (res: any) => {
    console.log('40', res)
    touchEndPageY = res.changedTouches[0].pageY
}

</script>

<style lang="scss">
.theater-hot-therter {
    background: #ccc;
    width: 100vw;
    .swiper {
        &-item {
            &__content{
                margin-right: 30rpx;
                border-radius: 12rpx;
                border: 1px solid #e6e6e6;
            }
            .hot-therter__item__img{
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>
