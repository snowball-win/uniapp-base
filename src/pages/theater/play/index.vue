<template>
    <view class="my-video-player">
        <swiper
            class="swiper"
            :circular="true"
            :vertical="true"
            :autoplay="autoplay"
            :duration="duration"
            :current="current"
            @change="changeplay"
            @touchstart="touchStart"
            @touchend="touchEnd"
        >
            <swiper-item v-for="(item, index) in videoList" :key="index" class="swiper-item">
                <video
                    id="myVideo"
                    controls
                    :class="item.direction"
                    :src="item.playUrl"
                    :show-fullscreen-btn="true"
                    :enable-play-gesture="true"
                    :enable-progress-gesture="true"
                    :show-center-play-btn="true"
                    :show-play-btn="false"
                    :autoplay="false"
                    object-fit="cover"
                    @error="videoErrorCallback"
                ></video>
                <view class="like" @click="onLike(item, index)">{{
                    item.likeStatus === 1 ? '已赞' : '点赞'
                }}</view>
                <view class="collect" @click="onCollect(item)">{{
                    item.collectStatus === 1 ?  '已藏' : '收藏'
                }}</view>
                <!-- <view class="share">分享</view> -->
                <button open-type="share" class="share">分享</button>
                <view class="notice">通知</view>
                <view class="title">{{ item.name }}</view>
                <view class="author">{{ item.orderNum }}</view>
                <view class="episodes" @click="showEpisodes">选集 ></view>
            </swiper-item>
        </swiper>
        <f-episodes ref="showFEpisodes" :list="videoList" :filmDetail="filmDetail" @setPlayTheEpisodes="setPlayTheEpisodes"></f-episodes>
    </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import request from '@/utils/request'
import { onLoad } from '@dcloudio/uni-app'
import { filtersUpdateStatus } from '@/utils/dict'

// 剧集id
let filmId = ''
onLoad((option: any)=>{
    console.log('54', option)
    filmId = option.filmId
    getEpisodesList()
})

const videoErrorCallback = (e: any) => {
    console.log(e)
}

// 自动播放
let current:any = ref(0)
const autoplay: boolean = false
// 滑动动画时长
const duration: number = 0
const changeplay = (res: any) => {
    console.log('34', res)
    const { detail } = res
    if(detail.source === 'autoplay' || detail.source === 'touch'){
        current.value = detail.current
        if (touchStartPageY < touchEndPageY) {
            console.log('向下滑动')
            let index = detail.current === videoList.value.length - 1 ? -1 : detail.current
            videoList.value[index + 1].playUrl = '' // 清空上一个视频
            getPlayInfo(videoList.value[detail.current].id, detail.current)
        } else {
            console.log('向上滑动')
            let index = detail.current === 0 ? videoList.value.length : detail.current
            videoList.value[index - 1].playUrl = '' // 清空上一个视频
            getPlayInfo(videoList.value[detail.current].id, detail.current)
        }
    }
}
let touchStartPageY: number = 0
const touchStart = (res: any) => {
    touchStartPageY = res.changedTouches[0].pageY
}
let touchEndPageY: number = 0
const touchEnd = (res: any) => {
    touchEndPageY = res.changedTouches[0].pageY
}
// 点赞
const onLike = (item: any, index: any) => {
    let params = {
        filmId: item.filmId,
        filmDetailsId: item.id
    }
    if(item.likeStatus === 0) {
        // item.likeStatus = 1
        request.post('/like-record-po/like', params).then((res: any) => {
            console.log(res)
            getPlayInfo(item.id, index)
        })
    } else {
        // item.likeStatus = 0
        request.post('/like-record-po/unlike', params).then((res: any) => {
            console.log(res)
            getPlayInfo(item.id, index)
        })
    }
}
// 收藏
const onCollect = (item: any): void => {
    console.log('115', item)
    let params = {
        filmId: item.filmId,
        filmDetailsId: item.id
    }
    if (item.collectStatus === 0) {
        item.collectStatus = 1
        request.post('/collect-record-po/collect', params).then((res: any) => {
            console.log(res)
        })
    } else {
        item.collectStatus = 0
        request.post('/collect-record-po/uncollect', params).then((res: any) => {
            console.log(res)
        })
    }
}
// 获取剧集
let videoList: any = ref([])
const getEpisodesList = () => {
    let params = {filmId: filmId}
    request.post('/fnjc/filmDetails/getList', params).then((res: any) => {
        console.log('136', res)
        let data = res.data.content
        data.forEach((item: any, index: number) => {
            item.playUrl = ''
            item.direction = 'vertical'
            item.playIndex = index
        });
        videoList.value = data
        // 热播、最新进来的播放第一集
        getPlayInfo(data[0].id, 0) // 详情
        // banner进来的播放指定剧集
        // getPlayInfo(data[index].id) // 详情
    })
}
// 展示剧集
const showFEpisodes:any = ref(null);
const showEpisodes = () => {
    console.log('148', showFEpisodes)
    showFEpisodes.value.show = true
}
// 剧集详情/播放信息
let filmDetail: any = ref({})
const getPlayInfo = (id: any, index: any) => {
    console.log('154', id)
    let params = {
        filmDetailsId: id
    }
    request.post('/fnjc/filmDetails/getPlayInfo', params).then((res: any) => {
        const data = res.data
        videoList.value[index].collectStatus = data.collectStatus
        videoList.value[index].likeStatus = data.likeStatus
        // 切换后视频播放器需要一个loading
        videoList.value[index].playUrl = 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4'
        filmDetail = {
            filmName: data.filmName,
            updateStatus: filtersUpdateStatus(data.updateStatus),
            totalNum: `共${data.totalNum}集`
        }
    })
}
// 播放指定剧集
const setPlayTheEpisodes = (item:any) => {
    nextTick(()=>{
        showFEpisodes.value.show = false
        current.value = item.playIndex
        getPlayInfo(item.id, item.playIndex) // 详情
    })
}

</script>

<style lang="scss">
.my-video-player {
    width: 100vw;
    height: 100vh;
    background: #ccc;
    .swiper {
        height: 100%;
        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: #000;
            .vertical {
                width: 100%;
                height: 100%;
            }
            .Horizontal {
                width: 100%;
                height: 200px;
            }
            .like {
                position: absolute;
                bottom: 300px;
                right: 10px;
                color: #ff0000;
                font-size: 18px;
            }
            .collect {
                position: absolute;
                bottom: 250px;
                right: 10px;
                color: #ff0000;
                font-size: 18px;
            }
            .share {
                position: absolute;
                bottom: 200px;
                right: 10px;
                color: #ff0000;
                font-size: 18px;
            }
            .notice {
                position: absolute;
                bottom: 150px;
                right: 10px;
                color: #ff0000;
                font-size: 18px;
            }
            .author {
                position: absolute;
                bottom: 80px;
                left: 10px;
                color: #ff0000;
                font-size: 18px;
            }
            .title {
                position: absolute;
                bottom: 50px;
                left: 10px;
                color: #ff0000;
                font-size: 18px;
            }
            .episodes{
                position: absolute;
                bottom: 50px;
                left: 150px;
                color: #ff0000;
                font-size: 18px;
            }
        }
    }
}
</style>
