<style lang="less" scoped>
.fire {
    .page {
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    .list-item {
        background: #fff;
    }
    .dialog {
        padding: 10px;
        .title {
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 1.7rem;
        }
        .conetnt {
            min-height: 4rem;
            text-indent: 2rem;
            margin-bottom: 2rem;
        }
        button {
            width: 90%;
        }
    }
}
</style>
<template>
    <div class="fire pages">
        <yd-navbar title="火灾信息" class="head-nav">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
        </yd-navbar>
        <div class="page">
            <scroll class="wrapper" :data="data" :pullup="true" @scrollToEnd="loadData" :pulldown="true" :xlShow="xlShow" @pulldown="newsListRefresh" v-if="nullData">
                <div class="content">
                    <div class="list-item" v-for="(item,index) in data" :key='index' @click="showInfo = item.info;show1 = true;">
                        <div class="left">
                            <div class="icon" style="background: #67C23A;" v-if="item.status == '已结案'">
                                完
                            </div>
                            <div class="icon" style="background:#FA5555;" v-else>
                                办
                            </div>
                        </div>
                        <div class="name">
                            <p class="title">{{item.enterpriseName}}</p>
                            <p class="small">
                                <span>{{item.info}}</span>
                                <span class="right">{{item.happenTime | date}}</span>
                            </p>
                        </div>
                    </div>
                    <ScrLoadingWrapperoll :isloading="isloading"></ScrLoadingWrapperoll>
                </div>
            </scroll>
            <div class="nullData" v-if="!nullData"></div>
        </div>
        <yd-popup v-model="show1" position="center" width="90%">
            <div class="dialog">
                <p class="title">火灾详细内容</p>
                <p class="conetnt">
                    {{showInfo}}
                </p>
                <p style="text-align: center;">
                    <yd-button @click.native="show1 = false">关闭</yd-button>
                </p>
            </div>
        </yd-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show1: false,
            xlShow: false,
            showInfo: '',
            data: [],
            dataSize: 0,
            isloading: true,
            page: 1,
            nullData: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadData()
        })
    },
    methods: {
        newsListRefresh() {
            this.xlShow = true;
            setTimeout(() => {
                this.data = [];
                this.page = 1;
                this.loadData();
            }, 1000);
        },
        loadData() {
            if (this.page != 1 && this.data.length >= this.dataSize) {
                this.isloading = false;
                return false;
            }
            //触发异步加载
            this.isloading = true;
            $.post(this.$store.state.link + '/fire/listData', {
                token: window.localStorage.getItem("token"),
                all: false,
                offset: (this.page - 1) * 12,
                limit: 12
            }, (data) => {
                if (data.success) {
                    if (data.data.length == 0) {
                        this.nullData = false;
                    } else {
                        this.nullData = true;
                    }
                    this.dataSize = data.total;
                    for (var item of data.data) {
                        this.data.push(item);
                    }
                    this.page++;
                    // 判断如果当前数据总数大于总数据 则停止加载
                    if (this.data.length >= this.dataSize) {
                        this.isloading = false;
                    }
                    this.xlShow = false;
                } else {
                    if (data.msg == 'token有误或超时！') {
                        window.localStorage.clear()
                        this.$router.go(0)
                    } else {
                        this.$dialog.toast({
                            mes: data.msg,
                            timeout: 500,
                            icon: 'error'
                        });
                    }
                }
            })

        },
    }
}
</script>
