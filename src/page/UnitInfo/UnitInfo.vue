<style lang="less" scoped>
.UnitInfo {
    .type {
        color: #fff;
        display: inline-block;
        text-align: center;
        line-height: 40px;
        font-size: 1.6rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .Red {
        background: #FA5555;
    }
    .Green {
        background: #67C23A;
    }
    .fire {
        font-size: 12px;
        color: #666;
        span {
            margin-right: 10px;
        }
    }
    .name {
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .yd-btn {
        height: auto;
        padding: 0 5px;
    }
    .yd-cell {
        z-index: none !important;
    }
    .yd-cell-item {
        padding: 7px;
        padding-left: 12px;
        background: #fff;
    }
    .search-box {
        width: 100%;
        height: 50px;
    }
}
</style>
<style>
.UnitInfo .wrapper {
    height: calc(100% - 50px);
    margin: 0;
    overflow: hidden;
}

.UnitInfo .yd-cell-left {
    width: 93%;
}
</style>


<template>
    <div class="UnitInfo pages">
        <Scroll class="wrapper" :data="enterpriseData" v-if="nullData">
            <div class="content">
                <yd-cell-item v-for="(item,index) in enterpriseData" :key='index' @click.native="toInfo(item.mess_user_id)">
                    <div slot="left" style="width:100%;">
                        <p class="name">{{item.mess_id.messagecontent}}</p>
                        <p class="fire">
                            <span style="color: #409EFF;">{{item.mess_id.messagesenddate}}</span>
                        </p>
                    </div>
                    <span slot="right">
                        <el-badge v-if="item.read_status == 0" is-dot class="item"></el-badge>
                    </span>
                </yd-cell-item>
                <ScrLoadingWrapperoll :isloading="isloading"></ScrLoadingWrapperoll>
            </div>
        </Scroll>
        <div class="nullData" v-if="!nullData"></div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            enterpriseData: [],
            xlShow: false,
            page: 1,
            isloading: false,
            dataSize: 0,
            nullData: true
        }
    },
    watch: {
        '$store.state.isDot'(val) {
            if (val) {
                this.loadList();
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadList();
        })
    },
    methods: {
        loadList() {
            this.$store.state.isDot = false;
            this.isloading = true;
            $.post(this.$store.state.link + '/message/getmessbyuser', {
                token: window.localStorage.getItem("token"),
                all: false,
                offset: (this.page - 1) * 10,
                limit: 10,
                username: window.localStorage.getItem("userName")
            }, (data) => {
                if (data.length == 0) {
                    this.nullData = false;
                } else {
                    this.nullData = true
                }
                this.enterpriseData = data;
                this.isloading = false;
            })
        },
        toInfo(id) {
            this.$router.push('/UnitInfoContent/' + id)
        }
    }
}
</script>
