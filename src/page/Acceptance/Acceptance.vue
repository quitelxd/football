<style lang="less" scoped>
.Acceptance {
    .default {
        text-align: center;
        margin: 10px;
        color: #999;
    }
    .fixtab {
        width: 100%;
        height: 100%;
        position: relative;
        ul.yd-tab-nav {
            width: 100%;
            height: 42px;
        }
    }
    &:after {
        content: '';
        display: block;
        clear: both;
    }
    .list-item {
        background: #fff;
    }
}
</style>

<template>
    <div class="Acceptance pages">
        <yd-navbar title="单位验收" class="head-nav">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
        </yd-navbar>

        <yd-tab class="fixtab">
            <yd-tab-panel label="未验收">
                <scroll class="wrapper" :data="data" v-if="nullData" :pullup="true" @scrollToEnd="loadData" :pulldown="true" :xlShow="xlShow" @pulldown="searchBtnFun">
                    <div class="content">
                        <div class="list-item" v-for="(item,index) in data" :key='index'>
                            <div class="left">
                                <div class="icon" v-if="item.tab == '重点单位'" style="background: #FA5555;">
                                    重
                                </div>
                                <div class="icon" v-else style="background: #67C23A;">
                                    般
                                </div>
                            </div>
                            <div class="name">
                                <p class="title" @click="info(item.id)">{{item.name}}</p>
                                <p class="small">
                                    <!--<span>{{item.tab}}</span>-->
                                    <span class="statusBtn" @click="acceptance(item.id)">
                                        <i class="ion-clipboard"></i> 验收</span>
                                </p>
                            </div>
                        </div>
                        <ScrLoadingWrapperoll :isloading="isloading"></ScrLoadingWrapperoll>
                    </div>
                </scroll>
                <div class="nullData" @click="data = [];page = 1;loadData()" v-if="!nullData"></div>
            </yd-tab-panel>

            <yd-tab-panel label="已验收">
                <scroll class="wrapper" :data="data1" v-if="nullData1" :pullup="true" @scrollToEnd="loadData1" :pulldown="true" :xlShow="xlShow1" @pulldown="searchBtnFun1">
                    <div class="content">
                        <div class="list-item" @click="info(item.id)" v-for="(item,index) in data1" :key='index'>
                            <div class="left">
                                <div class="icon" v-if="item.tab == '重点单位'" style="background: #FA5555;">
                                    重
                                </div>
                                <div class="icon" v-else style="background: #67C23A;">
                                    般
                                </div>
                            </div>
                            <div class="name">
                                <p class="title">{{item.name}}</p>
                                <p class="small">{{item.scale}}</p>
                            </div>
                        </div>
                        <ScrLoadingWrapperoll :isloading="isloading1"></ScrLoadingWrapperoll>
                    </div>
                </scroll>
                <div class="nullData" v-if="!nullData1"></div>
            </yd-tab-panel>

        </yd-tab>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tab: '未验收',
            data: [],
            data1: [],
            dataSize: 0,
            dataSize1: 0,
            isloading: true,
            isloading1: true,
            xlShow: false,
            xlShow1: false,
            page: 1,
            page1: 1,
            nullData: true,
            nullData1: true
        }
    },
    mounted() {
        this.loadData();
        this.loadData1();
    },
    methods: {
        acceptance(id) {
            this.$dialog.confirm({
                title: '验收单位',
                mes: '此操作将单位验收,是否继续?',
                opts: () => {
                    $.post(this.$store.state.link + '/enterprise/acceptance', {
                        token: window.localStorage.getItem("token"),
                        id: id
                    }, (data) => {
                        if (data.success) {
                            this.$dialog.toast({
                                mes: data.msg,
                                timeout: 500,
                                icon: 'success',
                                callback: () => {
                                    this.data = [];
                                    this.page = 1;
                                    this.loadData();
                                    this.data1 = [];
                                    this.page1 = 1;
                                    this.loadData1();
                                }
                            });
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
                }
            });
        },
        loadData() {
            document.querySelectorAll('.yd-tab-panel-item')[0].style.height = [document.querySelector('.yd-tab').offsetHeight - 42] + 'px';
            //如果当前数据总数大于总数据 则停止加载
            if (this.page != 1 && this.data.length >= this.dataSize) {
                this.isloading = false;
                return false;
            }

            //触发异步加载
            this.isloading = true;
            $.post(this.$store.state.link + '/enterprise/listData', {
                token: window.localStorage.getItem("token"),
                all: false,
                offset: (this.page - 1) * 10,
                limit: 10,
                acceptanceStatus: '未验收'
            }, (data) => {
                if (data.success) {
                    if (data.data.length == 0) {
                        this.nullData = false;
                    } else {
                        this.nullData = true;
                    }
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
        loadData1() {
            document.querySelectorAll('.yd-tab-panel-item')[1].style.height = [document.querySelector('.yd-tab').offsetHeight - 42] + 'px';
            //如果当前数据总数大于总数据 则停止加载
            if (this.page1 != 1 && this.data1.length >= this.dataSize1) {
                this.isloading1 = false;
                return false;
            }

            //触发异步加载
            this.isloading1 = true;
            $.post(this.$store.state.link + '/enterprise/listData', {
                token: window.localStorage.getItem("token"),
                all: false,
                offset: (this.page1 - 1) * 10,
                limit: 10,
                acceptanceStatus: '已验收'
            }, (data) => {
                if (data.success) {
                    if (data.data.length == 0) {
                        this.nullData1 = false;
                    } else {
                        this.nullData1 = true;
                    }
                    for (var item of data.data) {
                        this.data1.push(item);
                    }
                    this.page1++;
                    // 判断如果当前数据总数大于总数据 则停止加载
                    if (this.data1.length >= this.dataSize1) {
                        this.isloading1 = false;
                    }
                    this.xlShow1 = false;
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
        searchBtnFun() {
            this.xlShow = true;
            setTimeout(() => {
                this.data = [];
                this.page = 1;
                this.loadData();
            }, 1000);
        },
        searchBtnFun1() {
            this.xlShow1 = true;
            setTimeout(() => {
                this.data1 = [];
                this.page1 = 1;
                this.loadData1();
            }, 1000);
        },
        info(id) {
            this.$router.push('/UnitInfoContent/' + id)
        }
    }
}
</script>
