<template>
    <div class="navBox">
        <div class="content" :class="classPrefix?`${classPrefix}-content`:''">
            <slot/>
        </div>
        <Nav/>
    </div>
</template>

<script lang='ts'>
    export default {
        props:['classPrefix']
    }
</script>

<style lang="scss" scoped>
    .navBox{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        overflow: auto;
        flex-grow: 1;
    }
</style>