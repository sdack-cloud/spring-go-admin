<template>
  <div class="content">
    <a-result class="result" status="404" :subtitle="'已退出'"> </a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back"> 登录 </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

  const back = () => {
    const appStore = useAppStore();
    window.location.href = appStore.authLink;
  };
</script>

<style scoped lang="less">
  .content {
    // padding-top: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -95px;
    margin-top: -121px;
    text-align: center;
  }
</style>
