<template>
    <view class="title">
        <view class="title__content">
            <span>icon-</span>
            <span>{{title}}</span>
        </view>
    </view>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
interface Props {
    title?: string
}
const props = withDefaults(defineProps<Props>(), {
    title: '剧场'
})
// banner 数据
const { title } = toRefs(props)
</script>

<style lang="scss">
.title {
    &__content{
        width: 100vw;
        height: 50rpx;
    }
}
</style>
