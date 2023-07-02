<template>
    <view class="theater-hot-therter">
        <content-title title="最新剧场"></content-title>
        <view class="hot-therter-content">
            <div class="hot-therter-content__item" v-for="(item, index) in list" :key="index">
                <div @click="toPlayPage(item)">
                    <image :src="item.coverImg" alt="" class="theater-menu-bar__item__img" />
                    <div>
                        name
                    </div>
                </div>
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

// 去播放页面
const toPlayPage = (item: any) => {
    console.log('44', item)
    console.log('45', item.filmId)
    uni.navigateTo({
        url: './play/index?filmId=' + item.filmId
    })
}

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
