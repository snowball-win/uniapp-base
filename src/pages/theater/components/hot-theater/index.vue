<template>
    <view class="theater-hot-therter">
        <content-title title="热播剧场"></content-title>
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
                    <div class="swiper-item__content__info">
                        <view>{{ item.name }}</view>
                        <view>共{{ item.totalNum }}集</view>
                    </div>
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
    background: #ccc;
    width: 100vw;
    .swiper {
        &-item {
            &__content{
                margin-right: 30rpx;
                border-radius: 12rpx;
                border: 1px solid #e6e6e6;
                position: relative;
                height: 100%;
                &__img{
                    width: 100%;
                    min-height: 100%;
                }
                &__info{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background: #ccc;
                    opacity: 0.5;
                }
            }
        }
    }
}
</style>
