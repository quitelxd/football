<style lang="less" scoped>
.Supervise {
    .search-box {
        width: 100%;
        height: 50px;
    }
    .list-item {
        background: #fff;
    }
}
</style>
<style>
.Supervise .wrapper {
    height: calc(100% - 50px);
    overflow: hidden;
}

.Supervise .yd-cell-right {
    position: absolute;
    right: 8px;
    top: 25px;
    font-size: 12px;
}
</style>


<template>
    <div class="Supervise pages">
        <yd-navbar title="监督检查" class="head-nav">
            <div slot="left" @click="isHome">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
            <div slot="right" @click="addSupervise">
                <i class="ion-plus-round"></i> 添加
            </div>
        </yd-navbar>
        <Search v-model="searchName" class="search-box" @keydown.enter.native="submitHandler" placeholder="按单位名称查找"></Search>

        <Scroll class="wrapper" :data="data" :pullup="true" @scrollToEnd="loadList" :pulldown="true" :xlShow="xlShow" @pulldown="submitHandler" v-if="nullData">
            <div class="content">
                <div class="list-item" @click="toInfo(item.id)" v-for="(item,index) in data" :key='index'>
                    <div class="left">
                        <div class="icon" v-if="item.checkStatus == '未检查'" style="background: #FA5555;">
                            未
                        </div>
                        <div class="icon" v-else style="background: #67C23A;">
                            已
                        </div>
                    </div>
                    <div class="name">
                        <p class="title">{{item.enterpriseName}}</p>
                        <p class="small">
                            <span>
                                <span v-if="item.checkStatus == '未检查'">检查期限 {{item.startTime}}至{{item.endTime}}</span>
                                <span v-else>{{item.checkStatus}}</span>
                            </span>
                            <span class="right">{{item.checkTime | subTimeDay}}</span>
                        </p>
                    </div>
                </div>
                <ScrLoadingWrapperoll :isloading="isloading"></ScrLoadingWrapperoll>
            </div>
        </Scroll>
        <div class="nullData" v-if="!nullData"></div>
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
            searchName: '',
            page: 1,
            dataSize: 0,
            isloading: true,
            nullData: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadList()
        })
    },
    methods: {
        isHome() {
            if (this.$route.params.isAdd) {
                this.$router.go(-3)
            } else {
                this.$router.back()
            }
        },
        addSupervise() {
            this.$router.push('/AddSupervise')
        },
        submitHandler(val) {
            this.xlShow = true;
            setTimeout(() => {
                this.data = [];
                this.page = 1;
                this.loadList();
            }, 1000);
        },
        loadList() {
            if (this.page != 1 && this.data.length >= this.dataSize) {
                this.isloading = false;
                return false;
            }
            //触发异步加载
            this.isloading = true;
            $.post(this.$store.state.link + '/check/listData', {
                token: window.localStorage.getItem("token"),
                all: false,
                offset: (this.page - 1) * 10,
                limit: 10,
                enterpriseName: this.searchName
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
            this.$router.push('/SuperviseInfo/' + id)
        }
    }
}
</script>
