<template>
    <view class="my-video-player">
        <swiper
            class="swiper"
            :circular="true"
            :vertical="false"
            :autoplay="autoplay"
            :duration="duration"
        >
            <swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
                <image :src="item.coverImg" alt="" class="theater-menu-bar__item__img" />
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

</script>

<style lang="scss">
.my-video-player {
    width: 100vw;
    // height: 100%;
    background: #ccc;
    .swiper {
        height: 200px;
        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            height: 200px;
        }
    }
}
</style>
