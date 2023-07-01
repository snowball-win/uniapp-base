<template>
    <view class="content">
        <banner :list="bannerList"></banner>
        <menu-bar></menu-bar>
        <hot-theater :list="hotList"></hot-theater>
        <latest-theater :list="latest"></latest-theater>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import request from '@/utils/request'
import menuBar from './components/menu-bar/index.vue';
import hotTheater from './components/hot-theater/index.vue';
import latestTheater from './components/latest-theater/index.vue';

const wxscreen = () => {
    wx.onUserCaptureScreen(function (){
        console.log("用户截屏了");
    })
}
wxscreen()
// banner和hot的数据
// let bannerList: any = reactive([])
let bannerList: any = ref([])
let hotList: any = ref([])
const getBannerAndHot = () => {
    request.get('/fnjc/banner/getFristPageInfo').then((res: any) => {
        bannerList.value = res.data.bannerManageVoList
        hotList.value = res.data.bannerManageVoList
    })
}
getBannerAndHot()
// 最新剧场
let latest: any = ref([])
const getLatest = () => {
    request.post('/fnjc/filmMain/getList',{page:1, pageSize: 10}).then((res: any) => {
        latest.value = res.data.content
    })
}
getLatest()
</script>

<style lang="scss">
.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $bg-color;
    .video-player {
        height: 100%;
    }
}
</style>
