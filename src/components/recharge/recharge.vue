<!-- 充值 -->
<template>
    <view class="recharge" v-if="show">
        <view>
            <view>原创不易，支持作者</view>
            <view>充值购买后，方可继续观看</view>
            <view>本集价格100牛币，账户余额300牛币</view>
            <view @click="cancel">x</view>
        </view>
        <view class="recharge__content">
            <view class="recharge__content__item" v-for="(item, index) in list" :key="index">
                <view>{{ item.giveAmount }}</view>
                <view>{{ item.niuAmount }}</view>
                <view>{{ item.amount }}</view>
            </view>
        </view>
        <view>*本产品为虚拟内容服务，开通后将无法退还，请您谅解</view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import request from '@/utils/request'
let show = ref(false)
const cancel = () => {
    show.value = false
}
defineExpose({
    show
})
// 充值挡位
let list: any = ref([])
const getAmountInfoList = () => {
    request.post('/recharge/grade/list',{}).then((res: any) => {
        console.log('93', res)
        list.value = res.data
    })
}
getAmountInfoList()

</script>

<style lang="scss">
.recharge {
    background: #fff;
    padding: 0 30rpx;
    &__content{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        &__item{
            width: 334rpx;
            height: 150rpx;
            background: #EDEDED;
            border-radius: 16rpx;
            margin-bottom: 24rpx;
        }
    }
}
</style>
