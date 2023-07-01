<template>
    <view class="theater-menu-bar">
        <view v-for="(item, index) in videoList" :key="index" class="theater-menu-bar__item">
            <image src="@/static/logo.png" alt="" class="theater-menu-bar__item__img" />
            <span>{{ item.title }}</span>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
// import request from '@/utils/request'

interface videoItem {
    url?: string
    direction?: string
    author?: string
    title?: string
    like?: boolean
    collect?: boolean
}
let videoList: videoItem[] = reactive([
    {
        url: '@/static/logo.png',
        direction: 'Horizontal', // Horizontal 横向 vertical 竖向
        author: 'snow',
        title: '热播',
        like: true,
        collect: true
    },
    {
        url: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
        direction: 'vertical',
        author: 'snow',
        title: '最新',
        like: true,
        collect: true
    },
    {
        url: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
        direction: 'Horizontal',
        author: 'snow',
        title: '充值',
        like: true,
        collect: true
    },
])

const videoErrorCallback = (e: any) => {
    console.log(e)
}

const store = useStore()
const title = ref(store.state.system.title)
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

const onLike = (item: videoItem) => {
    item.like = !item.like
    // request.post('/UcAuthCompany/getName').then((res: any) => {
    //     console.log(res)
    // })
}
const onCollect = (item: any, index: number): void => {
    videoList[index].collect = !videoList[index].collect
    console.log('131', videoList[index])
}

</script>

<style lang="scss">
.theater-menu-bar {
    display: flex;
    width: 100vw;
    &__item{
        &__img {
            width: 20px;
            height: 20px;
            background: #ff0000;
        }
        width:50px;
        height:50px;
        display: flex;
        flex-direction: column;
    }
}
</style>
