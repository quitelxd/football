<style lang="less" scoped>
@keyframes loadingWrapper{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
.loading-wrapper{
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #999;
    .icon{
        display: inline-block;
        animation: loadingWrapper 1s linear infinite;
    }
}
</style>

<template>
    <div class="loading-wrapper">
        <div v-show="isloading">
            <div class="icon"><i class="ion-load-c"></i></div>
            加载中...
        </div> 
        <div v-show="!isloading">没有更多了</div>
    </div>
</template>

<script>
export default {
    props:{
        isloading: {
            default: false,
            type: Boolean
        }
    },
    methods:{
    }
}
</script>
