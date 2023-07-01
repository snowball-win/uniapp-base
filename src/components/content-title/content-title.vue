<template>
    <view class="title">
        <view class="title__content">
            <span>icon-</span>
            <span>title</span>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
// import request from '@/utils/request'

</script>

<style lang="scss">
.title {
    &__content{
        width: 100vw;
        height: 50rpx;
    }
}
</style>
