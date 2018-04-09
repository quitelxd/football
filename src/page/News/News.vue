<style lang="less" scoped>
.news {
    position: relative;
    .btnGroup {
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        height: 100px;
        width: 100%;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            transform: scaleY(.4);
            background: #ddd;
        }

        .tj-btn {
            width: 31%;
            display: inline-block;
            text-align: center;
            margin: 0 1%;
            margin-bottom: 10px;
            border: 1px solid #ff3131;
            padding: 6px 0;
            border-radius: 3px;
            color: #ff3131;
            &.active {
                background: #ff3131;
                color: #fff;
            }
        }
    }
    .news-list {
        // background: #fff;
        overflow: hidden;
        .news-item {
            background: #fff;
            position: relative;
            padding: 15px;
            .title {
                font-size: 1.5rem;
                margin-bottom: 5px;
            }
            .time {
                text-align: right;
                margin-bottom: 5px;
                font-size: 12px;
                color: #999;
            }
            .content {
                color: #999;
                font-size: 12px;
                div {
                    float: left;
                    width: 50%;
                }
                &:after {
                    content: '';
                    display: block;
                    clear: both;
                }
            }
            &:after {
                content: '';
                position: absolute;
                height: 1px;
                width: 94%;
                background: #ddd;
                bottom: 0;
                left: 3%;
                -webkit-transform: scaleY(0.4);
                transform: scaleY(0.4);
            }
        }
    }
}
</style>

<style>
.news-list {
    max-height: calc(100% - 100px);
}
</style>


<template>
    <div class="news">
        <div class="btnGroup">
            <div class="tj-btn" :class="isActive(item.value)" v-for="(item,index) in newsTypeList" :key="index" @click="newsType = item.value">{{item.name}}</div>
        </div>

        <scroll class="wrapper news-list" :data="newsList" :pullup="true" @scrollToEnd="loadList" :pulldown="true" :xlShow="xlShow" @pulldown="newsListRefresh" v-if="nullData">
            <div class="content">
                <div class="news-item" v-for="(item,index) in newsList" :key="index" @click="toNewsInfo(item.id)">
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="time">
                        {{item.cdate | subTimeDay}}
                    </div>
                    <!-- <div class="content"> -->
                    <!--<div>新闻类型:
                                <span v-if="item.type == 'CMS_1'">通知通报</span>
                                <span v-if="item.type == 'CMS_2'">新闻公告</span>
                                <span v-if="item.type == 'CMS_3'">消防安全宣传</span>
                                <span v-if="item.type == 'CMS_4'">消防动态</span>
                                <span v-if="item.type == 'CMS_5'">法律法规</span>
                            </div>-->
                    <!--<div>发起人: </div>-->
                    <!-- </div> -->
                </div>
                <ScrLoadingWrapperoll :isloading="isloading"></ScrLoadingWrapperoll>
            </div>
        </scroll>
        <div class="nullData" v-if="!nullData"></div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            xlShow: false,
            newsList: [],
            newsType: '',
            newsTypeList: [{
                name: '全部',
                value: ''
            }, {
                name: '通知通报',
                value: 'CMS_1'
            }, {
                name: '新闻公告',
                value: 'CMS_2'
            }, {
                name: '消防安全宣传',
                value: 'CMS_3'
            }, {
                name: '消防动态',
                value: 'CMS_4'
            }, {
                name: '法律法规',
                value: 'CMS_5'
            }],
            isloading: false,
            dataSize: 0,
            nullData: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadList()
        })
    },
    watch: {
        newsType(val) {
            this.newsListRefresh();
        }
    },
    methods: {
        newsListRefresh() {
            this.xlShow = true;
            setTimeout(() => {
                this.newsList = [];
                this.page = 1;
                this.loadList();
            }, 1000);
        },
        isActive(value) {
            if (this.newsType == value) {
                return 'active';
            } else {
                return '';
            }
        },
        toNewsInfo(id) {
            this.$router.push('/NewsInfo/' + id)
        },
        loadList() {
            if (this.page != 1 && this.newsList.length >= this.dataSize) {
                this.isloading = false;
                return false;
            }

            this.isloading = true;
            $.post(this.$store.state.link + '/announcement/listData', {
                all: false,
                type: this.newsType,
                offset: (this.page - 1) * 10,
                limit: 10,
            }, (data) => {
                if (data.success) {
                    if (data.data.length == 0) {
                        this.nullData = false;
                    } else {
                        this.nullData = true;
                    }
                    this.dataSize = data.total;
                    for (var item of data.data) {
                        this.newsList.push(item);
                    }
                    this.page++;
                    if (this.newsList.length >= this.dataSize) {
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
        }
    }
}
</script>
