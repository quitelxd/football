<style lang="less" scoped>
.report-problem {
    .list-item {
        background: #fff;
        .ju-type {
            background: #ddd;
            padding: 0 5px;
            border-radius: 3px;
            margin-right: 3px;
            color: #fff;
        }
    }
}
</style>
<style>
.wrapper {
    height: calc(100% - 50px);
    overflow: hidden;
}
</style>

<template>
    <div class="report-problem pages">
        <yd-navbar title="隐患上报" class="head-nav">
            <div slot="left" @click="isHome">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
            <div slot="right" @click="$router.push('/DangerAdd/2')">
                <i class="ion-plus-round"></i> 添加
            </div>
        </yd-navbar>
        <Search v-model="enterpriseName" @keydown.enter.native="searchBtnFun" placeholder="按企业名称查找"></Search>
        <Scroll class="wrapper" :data="data" :pullup="true" @scrollToEnd="loadData" :pulldown="true" :xlShow="xlShow" @pulldown="searchBtnFun" v-if="nullData">
            <div class="content">

                <div class="list-item" @click="toInfo(item.id)" v-for="(item,index) in data" :key='index'>
                    <div class="left">
                        <div class="icon" v-if="item.level == '一般隐患'" style="background: #FA5555;">
                            般
                        </div>
                        <div class="icon" v-if="item.level == '重大隐患'" style="background: #67C23A;">
                            重
                        </div>
                        <div class="icon" v-if="item.level == '动态隐患'" style="background: rgb(214, 199, 26);">
                            动
                        </div>
                    </div>
                    <div class="name">
                        <p class="title">{{item.enterpriseName}}</p>
                        <p class="small">
                            <span class="ju-type" v-if="item.handleStauts" :style="{'background': jdTypeColor(item.handleStauts)}">{{item.handleStauts}}</span>
                            <span>{{item.rectificationStatus}}</span>
                            <span class="right">{{item.checkDate | date}}</span>
                        </p>
                    </div>
                </div>

                <ScrLoadingWrapperoll :isloading="isloading"></ScrLoadingWrapperoll>
            </div>
        </Scroll>

    </div>
</template>

<script>
import Search from '../../components/Search'
export default {
    components: {
        Search
    },
    data() {
        return {
            data: [],
            xlShow: false,
            page: 1,
            dataSize: 0,
            isloading: true,
            nullData: true,

            enterpriseName: ''

        }
    },
    created() {
        this.loadData();
    },
    methods: {
        jdTypeColor(a) {
            if (a == '审核中') {
                return '#f9be35'
            } else if (a == '审核通过') {
                return '#26c5f7'
            } else if (a == '审核未通过') {
                return 'rgb(250, 85, 85)'
            }
        },
        searchBtnFun() {
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
            $.post(this.$store.state.link + '/problem/reportData', {
                token: window.localStorage.getItem("token"),
                all: false,
                offset: (this.page - 1) * 10,
                limit: 10,
                type: '',
                enterpriseName: this.enterpriseName
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
        toInfo(id) {
            this.$router.push('/DangerInfo/' + id)
        },
        isHome() {
            if (this.$route.params.isAdd) {
                this.$router.go(-3)
            } else {
                this.$router.back()
            }
        },
    }
}
</script>

