<template>
    <view class="theater-hot-therter">
        <content-title></content-title>
        <view class="hot-therter-content">
            <div class="hot-therter-content__item" v-for="(item, index) in list" :key="index">
                <image :src="item.coverImg" alt="" class="theater-menu-bar__item__img" />
            </div>
        </view>
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

</script>

<style lang="scss">
.theater-hot-therter {
    background: #ccc;
    width: 100vw;
    .hot-therter-content{
        display: flex;
        flex-wrap: wrap;
        &__item{
            width: 50%;
            overflow: hidden;
            flex-shrink: 0;
        }
    }
}
</style>
