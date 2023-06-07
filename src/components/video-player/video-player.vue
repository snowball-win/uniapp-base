<template>
    <view class="my-video-player">
        <swiper
            class="swiper"
            :circular="true"
            :vertical="true"
            :autoplay="autoplay"
            :duration="duration"
            @change="changeplay"
            @touchstart="touchStart"
            @touchend="touchEnd"
        >
            <swiper-item v-for="(item, index) in 5" :key="index">
                <view class="swiper-item">视频{{ index }}</view>
            </swiper-item>
        </swiper>
    </view>
    <!-- <button @click="apiTest">调用代理接口</button> -->
    <!-- <view>{{ title }}</view> -->
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const title = ref(store.state.system.title)
// 自动播放
const autoplay:boolean = false
// 滑动动画时长
const duration:number = 500
const changeplay = (res: any) => {
    console.log("34", res)
    if(touchStartPageY < touchEndPageY){
        console.log("向下滑动")
    }else{
        console.log("向上滑动")
    }
}
let touchStartPageY: number = 0
const touchStart = (res: any) => {
    console.log("37", res)
    touchStartPageY = res.changedTouches[0].pageY
}
let touchEndPageY: number = 0
const touchEnd = (res: any) => {
    console.log("40", res)
    touchEndPageY = res.changedTouches[0].pageY
}

const apiTest = () => {
    request.post('/UcAuthCompany/getName').then((res: any) => {
        console.log(res)
    })
}
</script>

<style lang="scss">
.my-video-player{
    width: 100vw;
    height: 100%;
    background: #ccc;
    .swiper{
        height: 100%;
    }
}
</style>