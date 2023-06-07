<template>
  <view class="content">
    <!-- <image class="logo" src="@/static/logo.png" /> -->
    <video-player class="video-player"></video-player>
    <!-- <video-list></video-list> -->
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
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
  .video-player{
    height: 100%;
  }
}
</style>
