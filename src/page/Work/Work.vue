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
        <Scroll class="wrapper" :data="data" :pullup="true" :xlShow="xlShow" v-if="nullData">
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
            num: 0
        }
    },
    watch: {
        '$store.state.isDot'(val, oldval) {
            if (val) {
                this.loadList();
            }
        }
    },
    created() {
        this.loadList();
    },
    methods: {
        loadList(num) {
            this.$store.state.isDot1 = false;
            $.post(this.$store.state.link + '/footballapi/gettoday', {
                token: window.localStorage.getItem("token"),
                num: num
            }, (data) => {
                this.isloading = false;
                if (typeof data != 'object') {
                    data = JSON.parse(data);
                }
                if (data != '' || data == '') {
                    this.data = data;
                    this.num = data.length;
                } else {
                    this.$dialog.toast({
                        mes: data.msg,
                        timeout: 500,
                        icon: 'error'
                    });
                    window.localStorage.clear()
                    this.$router.push('/Login')
                }
                setTimeout(() => {
                    if (window.localStorage.getItem("token")) {
                        this.loadList(this.num);
                    }
                }, 18000)
            })
        }
    }
}
</script>
