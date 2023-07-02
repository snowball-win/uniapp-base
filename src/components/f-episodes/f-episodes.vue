<!-- 放牛剧场-选集 -->
<template>
    <view class="episodes" v-if="show">
        <view>
            <view>傲慢与偏见</view>
            <view @click="cancel">x</view>
        </view>
        <view class="episodes__content">
            <view class="episodes__content__item" v-for="(item, index) in list" :key="index">
                <image :src="item.coverImg" alt="" class="episodes__content__item__img" />
                <view>{{ item.name }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
// import request from '@/utils/request'
let show = ref(false)
const cancel = () => {
    show.value = false
}
defineExpose({
    show
})
interface Props {
    list?: any
}
const props = withDefaults(defineProps<Props>(), {
    list: ''
})
// banner 数据
const { list } = toRefs(props)
// 剧集
// let list: any = ref([])
// const getEpisodesList = () => {
//     let params = {filmId: '1'}
//     request.post('/fnjc/filmDetails/getList', params).then((res: any) => {
//         console.log('152-2', res)
//         list.value = res.data.content
//     })
// }
// getEpisodesList()

</script>

<style lang="scss">
.episodes {
    background: #fff;
    padding: 0 30rpx;
    position: fixed;
    width: 100vw;
    left: 0;
    bottom: 0;
    &__content{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        &__item{
            width: 220rpx;
            height: 320rpx;
            background: #EDEDED;
            border-radius: 16rpx;
            margin-bottom: 24rpx;
            margin-right: 20rpx;
            overflow: hidden;
            &__img{
                width: 100%;
            }
        }
    }
}
</style>
