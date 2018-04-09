<style lang="less" scoped>
.Danger {
    .search-box {
        width: 100%;
        height: 50px;
        padding: 10px 3%;
        >div {
            background: #fff;
            height: 30px;
            line-height: 30px;
            text-indent: .3em;
            border-radius: 3px;
            color: #999;
            i {
                font-size: 15px;
                margin-right: 3px;
            }
        }
    }
    .yd-cell-item {
        padding: 7px;
        padding-left: 12px;
    }
    .list-item {
        background: #fff;
    }
}

.z-pop {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    // padding-top: 20px;
    background: #eee;
    z-index: 100;
}
</style>
<style lang="less">
.yd-popup-content .yd-cell-item {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.yd-cell-box {
    margin-bottom: 0 !important;
    .yd-cell {
        z-index: none !important;
        .yd-cell-title {
            font-size: 13px;
            padding: 12px 15px 12px 15px !important;
            padding-left: 15px !important;
        }
    }
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

{
    transform: translateY(10px);
    opacity: 0;
}

.pop-head {
    background: #eee;
    width: 100%;
    padding: 0 15px;
    padding-top: 10px;
    .close {
        float: left;
        color: #999;
    }
    .search-btn {
        float: right;
        color: #67C23A;
    }
    i {
        font-size: 15px;
    }
}
</style>

<style>
.Danger .jjj {
    height: calc(100% - 50px);
    overflow: hidden;
}

.Danger .z-pop .content {
    height: calc(100% - 80px) !important;
    overflow: auto;
}
</style>
<template>
    <div class="Danger pages">
        <yd-navbar title="隐患信息" class="head-nav">
            <div slot="left" @click="isHome">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
            <div slot="right" @click="$router.push('/DangerAdd/1')">
                <i class="ion-plus-round"></i> 添加
            </div>
        </yd-navbar>
        <transition name="slide-fade">
            <div class="z-pop" v-show="rightShow">
                <div class="pop-head">
                    <div class="close" @click="rightShow = false;">
                        <i class="ion-close-round"></i> 关闭</div>
                    <div class="search-btn" @click="searchBtnFun()">
                        <i class="ion-ios-search-strong"></i> 查找</div>
                    <div style="clear:both;"></div>
                </div>
                <Search v-model="enterpriseName" placeholder="按企业名称查找"></Search>

                <div class="content">
                    <yd-cell-group title="隐患类型">
                        <yd-cell-item type="radio">
                            <span slot="left">全部隐患</span>
                            <input slot="right" type="radio" value="" v-model="type" />
                        </yd-cell-item>
                        <yd-cell-item type="radio">
                            <span slot="left">一般隐患</span>
                            <input slot="right" type="radio" value="一般隐患" v-model="type" />
                        </yd-cell-item>
                        <yd-cell-item type="radio">
                            <span slot="left">重大隐患</span>
                            <input slot="right" type="radio" value="重大隐患" v-model="type" />
                        </yd-cell-item>
                        <yd-cell-item type="radio">
                            <span slot="left">动态隐患</span>
                            <input slot="right" type="radio" value="动态隐患" v-model="type" />
                        </yd-cell-item>
                    </yd-cell-group>

                    <yd-cell-group title="隐患时间" v-if="dangerMenu.length>0">
                        <yd-cell-item type="radio" v-for="(item,index) of dangerMenu" :key="index">
                            <span slot="left">{{item.name}}</span>
                            <input slot="right" type="radio" :value="item.name" v-model="timeliness" />
                        </yd-cell-item>
                    </yd-cell-group>

                    <yd-cell-group title="隐患来源">
                        <yd-cell-item type="radio">
                            <span slot="left">全部</span>
                            <input slot="right" type="radio" value="" v-model="fromType" />
                        </yd-cell-item>
                        <yd-cell-item type="radio">
                            <span slot="left">内网</span>
                            <input slot="right" type="radio" value="内网" v-model="fromType" />
                        </yd-cell-item>
                        <yd-cell-item type="radio">
                            <span slot="left">网格化</span>
                            <input slot="right" type="radio" value="网格化" v-model="fromType" />
                        </yd-cell-item>
                        <yd-cell-item type="radio">
                            <span slot="left">单位自查</span>
                            <input slot="right" type="radio" value="单位自查" v-model="fromType" />
                        </yd-cell-item>
                        <yd-cell-item type="radio">
                            <span slot="left">执法APP</span>
                            <input slot="right" type="radio" value="执法APP" v-model="fromType" />
                        </yd-cell-item>
                    </yd-cell-group>

                </div>
            </div>
        </transition>
        <div class="search-box" @click="popupShow()">
            <div>
                <i class="ion-ios-search-strong"></i> 查找
            </div>
        </div>

        <Scroll class="wrapper jjj" :data="data" :pullup="true" @scrollToEnd="loadData" :pulldown="true" :xlShow="xlShow" @pulldown="searchBtnFun" v-if="nullData">
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
                            <span>{{item.rectificationStatus}}</span>
                            <span class="right">{{item.checkDate | date}}</span>
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
            rightShow: false,
            enterpriseName: '',
            type: '',

            xlShow: false,
            page: 1,
            timeliness: this.$store.state.dangerMenu[0].name,
            fromType: '',
            data: [],
            dataSize: 0,
            isloading: true,

            dangerMenu: this.$store.state.dangerMenu,

            nullData: true
        }
    },
    created() {
        this.loadData();
    },
    watch: {

    },
    methods: {
        isHome() {
            if (this.$route.params.isAdd) {
                this.$router.go(-3)
            } else {
                this.$router.back()
            }
        },
        searchBtnFun() {
            this.xlShow = true;
            setTimeout(() => {
                this.data = [];
                this.page = 1;
                this.rightShow = false;
                this.loadData();
            }, 1000);
        },
        popupShow() {
            this.rightShow = true;
        },
        loadData() {
            if (this.page != 1 && this.data.length >= this.dataSize) {
                this.isloading = false;
                return false;
            }
            //触发异步加载
            this.isloading = true;
            $.post(this.$store.state.link + '/problem/listData', {
                token: window.localStorage.getItem("token"),
                all: false,
                offset: (this.page - 1) * 10,
                limit: 10,
                timeliness: this.timeliness,
                fromType: this.fromType,
                type: this.type,
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
    }
}
</script>
