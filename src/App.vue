<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '~@/assets/styles/base.scss';
  @import '~@/assets/styles/reset.scss';
  *{
    margin:0;padding: 0;
  }
  body{
    line-height: 1.5;
    font-family: $font-hei;
    color: #333;
    background: #f5f5f5;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
</style>
