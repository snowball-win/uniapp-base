
<template>
    <view class="content">
        <video-player class="video-player"></video-player>
    </view>
</template>

<script setup lang="ts">
const wxscreen = () => {
    wx.onUserCaptureScreen(function (){
        // flag.value = true
        console.log("用户截屏了");
    })
}
wxscreen()
</script>

<style lang="scss">
.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $bg-color;
    .video-player {
        height: 100%;
    }
}
</style>
