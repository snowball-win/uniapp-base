<!-- 放牛剧场-选集 -->
<template>
    <view class="episodes" v-if="show">
        <view class="episodes__info">
            <view class="episodes__info__content">
                <view class="episodes__info__content__name">{{ filmDetail.filmName }}</view>
                <view class="episodes__info__content__status">
                    <span>{{ filmDetail.updateStatus }} {{ filmDetail.totalNum }}</span>
                </view>
                <view class="episodes__info__content__cancel" @click="cancel">x</view>
            </view>
            <view class="episodes__info__num">
                <text class="episodes__info__num__item episodes__info__num__item__active">1-30</text>
                <text class="episodes__info__num__item">31-60</text>
                <text class="episodes__info__num__item">61-90</text>
                <text class="episodes__info__num__item">61-100</text>
            </view>
        </view>
        <view class="episodes__content">
            <view
                class="episodes__content__item"
                v-for="(item, index) in list"
                :key="index"
                @click="playTheEpisodes(item)"
            >
                <!-- unLockStatus 不是 1 需要付费 -->
                <image :src="item.filmMainCoverImg" alt="" class="episodes__content__item__img" />
                <view class="episodes__content__item__unLock" v-if="item.unLockStatus !== 1">
                    <text>解锁</text>
                </view>
                <view class="episodes__content__item__name">{{ item.name }}</view>
            </view>
        </view>
        <!-- <uni-popup ref="popup" type="bottom" background-color="#fff">
            购买该剧集
        </uni-popup> -->
        <uni-popup ref="alertDialog" type="dialog">
            <uni-popup-dialog 
                type="info" 
                cancelText="关闭"
                confirmText="购买"
                title="提示"
                content="购买该剧集"
                @confirm="dialogConfirm"
                @close="dialogClose">
            </uni-popup-dialog>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { ref, toRefs, defineEmits } from 'vue'
let show = ref(false)
const cancel = () => {
    show.value = false
}
defineExpose({
    show
})
interface Props {
    list?: any,
    filmDetail: any
}
const props = withDefaults(defineProps<Props>(), {
    list: '',
    filmDetail: {
        filmName: '',
        updateStatus: '',
        totalNum: ''
    }
})
// banner 数据
const { list, filmDetail } = toRefs(props)
// 播放指定剧集
const alertDialog = ref()
const emit = defineEmits(['setPlayTheEpisodes'])
let itemDetail: any = {}
const playTheEpisodes = (item: any) => {
    if(item.unLockStatus !== 1) { // 付费
        console.log('付费')
        itemDetail = item
        alertDialog.value.open()
    } else { // 播放
        emit('setPlayTheEpisodes', item)
    }
}
// 弹窗提示购买
const dialogConfirm = () => {
    console.log('购买')
    buyTheEpisodes()
}
const dialogClose = () => {
    console.log('关闭')
}

// 购买
const buyTheEpisodes = () => {
    request.post('/consumption/record/consumption',{filmDetailsId: itemDetail.id})
    .then((res: any) => {
        console.log('93', res)
        if (res.code === '00-00-0000') {
            emit('setPlayTheEpisodes', itemDetail)
            uni.showToast({
                title: `购买成功`,
                icon: 'none'
            })
        }
    })
}

</script>

<style lang="scss">
.episodes {
    background: #fff;
    padding: 0 30rpx;
    position: fixed;
    width: calc(100vw - 60rpx);
    left: 0;
    bottom: 0;
    border-radius: 34rpx 34rpx 0 0;
    &__info{
        &__content{
            position: relative;
            margin: 30rpx 0;
            &__name{
                font-size: 30rpx;
                font-weight: bold;
                color: #333;
            }
            &__status{
                font-size: 24rpx;
                font-weight: 400;
                color: #666;
            }
            &__cancel{
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        &__num{
            margin-bottom: 20rpx;
            &__item{
                color: #333;
                font-weight: 400;
                font-size: 32rpx;
                text-align: center;
                width: 130rpx;
                height: 56rpx;
                line-height: 56rpx;
                display: inline-block;
                border-radius: 8rpx;
                &__active{
                    color: #fff;
                    background: #FF7979;
                }
            }
        }
    }
    &__content{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr; // 列 
        grid-column-gap: 15rpx;
        height: 725rpx;
        overflow: auto;
        margin-bottom: 80rpx;
        &__item{
            width: 220rpx;
            height: 320rpx;
            background: #EDEDED;
            border-radius: 16rpx;
            margin-bottom: 24rpx;
            overflow: hidden;
            position: relative;
            &__img{
                width: 100%;
            }
            &__name{
                position: absolute;
                z-index: 2;
                width: 100%;
                text-align: center;
                bottom: 0;
                font-size: 28rpx;
                color: #fff;
                height: 64rpx;
                line-height: 64rpx;
                background: #000000;
                opacity: 0.5;
                letter-spacing: 2px;
            }
            &__unLock{
                position: absolute;
                z-index: 1;
                text-align: center;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #999;
                // 第一种高斯模糊
                // background: #000;
                // opacity: 0.6;
                // filter: alpha(opacity=60)
                // 第二种高斯模糊
                background: rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(2px);
            }
        }
    }
}
</style>
