<template>
    <view class="title">
        <view class="title__content">
            <image :src="icon" class="title__content__image"></image>
            <span class="title__content__text">{{title}}</span>
        </view>
    </view>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
    title?: string,
    icon?: string
}
const props = withDefaults(defineProps<Props>(), {
    title: '',
    icon: ''
})
// banner 数据
const { title } = toRefs(props)
</script>

<style lang="scss">
.title {
    padding: 0 30rpx;
    &__content{
        width: 100vw;
        height: 126rpx;
        display: flex;
        align-items: center;
        &__image{
            width: 42rpx;
            height: 37.5rpx;
        }
        &__text{
            color: #FF7979;
            font-size: 36rpx;
            font-weight: bold;
            margin-left: 10rpx;
        }
    }
}
</style>
