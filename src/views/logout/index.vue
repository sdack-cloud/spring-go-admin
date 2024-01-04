<template>
  <div class="content">
    <a-result class="result" status="404" :subtitle="'已退出'"> </a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back"> 登录 </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>

  const back = () => {
    window.location.href = 'http://localhost:9999/oauth2/authorize?response_type=code&client_id=sdack&redirect_uri=http://localhost:5173/dashboard/index&scope=profile';
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
