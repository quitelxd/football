<style lang="less">
.work {
    .yd-slider-wrapper {
        height: 180px;
        img {
            height: 100%;
        }
    }
    .yd-grids-3 {
        background: none;
        &:before {
            border: none;
        }
    }
}
</style>
<template>
    <div class="work">
        <Scroll class="wrapper" :data="data" :pullup="true" @scrollToEnd="loadList" :xlShow="xlShow" v-if="nullData">
            <div class="content">
                <div class="list-item" v-for="(item,index) in data" :key='index'>
                    <div class="name">
                        <p class="title">{{item.homeTeam}}--{{item.awayTeam}}</p>
                        <p class="smallTitle">
                            <span>提示盘口：{{item.promptPosition | null}}</span>
                            <span>提示水位：{{item.promptWater | null}}</span>
                            <span>模型命中：{{item.modelHit | null}}</span>
                        </p>
                        <p class="small">
                            <span>{{item.promptScore}}</span>
                            <template v-if="item.gameResults == '赢'">
                                <span class="right" style="color:green;">{{item.gameResults}}</span>
                            </template>
                            <template v-else>
                                <span class="right" style="color:red;">{{item.gameResults}}</span>
                            </template>
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
export default {
    data() {
        return {
            data: [],
            xlShow: false,
            isloading: true,
            nullData: true,
            page: 1,
            dataSize: 0,
        }
    },
    created() {
        $.post(this.$store.state.link + '/footballapi/getHistory', {
            token: window.localStorage.getItem("token"),
            targetPage: this.page
        }, (data) => {
            this.isloading = false;
            if (typeof data != 'object') {
                data = JSON.parse(data);
            }
            if (data.code == 200) {
                this.data = data.data.games;
            } else if (data.success == false || data.code != 200) {
                this.$dialog.toast({
                    mes: data.msg,
                    timeout: 500,
                    icon: 'error'
                });
                window.localStorage.clear()
                this.$router.push('/Login')
            }
        })
    },
    methods: {
        loadList() {

            if (this.page != 1 && this.data.length >= this.dataSize) {
                this.isloading = false;
                return false;
            }
            this.isloading = true;
            $.post(this.$store.state.link + '/footballapi/getHistory', {
                token: window.localStorage.getItem("token"),
                targetPage: this.page
            }, (data) => {
                if (typeof data != 'object') {
                    data = JSON.parse(data);
                }
                if (data.code == 200) {
                    if (data.data.games.length == 0) {
                        this.nullData = false;
                    } else {
                        this.nullData = true
                    }
                    this.dataSize = data.total;
                    for (var item of data.data.games) {
                        this.data.push(item);
                    }
                    this.page++;
                    if (this.data.length >= this.dataSize) {
                        this.isloading = false;
                    }
                    this.xlShow = false;
                } else if (data.success == false) {
                    this.$dialog.toast({
                        mes: data.msg,
                        timeout: 500,
                        icon: 'error'
                    });
                    window.localStorage.clear()
                    this.$router.go(0)
                }
            })
        },
    }
}
</script>
