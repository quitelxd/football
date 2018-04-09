<style lang="less" scoped>
.dangerInfo {
    .wrapper {
        .content {
            background: #fff;
            .textarea {
                width: 80%;
                padding: 5px 0;
            }
            .title {
                padding: 10px;
                background: #f5f5f5;
            }
            .imgShow {
                img {
                    width: 33%;
                    height: 10rem;
                    padding: 3%;
                }
            }
            .fileShow {
                padding: 3%;
                span {
                    margin-right: 10px;
                }
            }
        }
    }
}

.yd-cell-box {
    margin-bottom: 0 !important;
}
</style>
<style>
.dangerInfo .wrapper {
    height: 100%;
    overflow: hidden;
}
</style>

<template>
    <div class="dangerInfo pages">
        <yd-navbar title="隐患信息" class="head-nav">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
        </yd-navbar>
        <Scroll class="wrapper" :data="attach || rectificationData">
            <div class="content">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">企业名称</span>
                        <span slot="right">{{data.enterpriseName | null}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">隐患来源</span>
                        <span slot="right">{{data.fromType}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">隐患等级</span>
                        <span slot="right">{{data.level}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">上报人</span>
                        <span slot="right">{{data.checkPerson}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">发现时间</span>
                        <span slot="right">{{data.checkDate | subTimeDay}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">整改状态</span>
                        <span slot="right">{{data.rectificationStatus}}</span>
                    </yd-cell-item>
                    <yd-cell-item v-if="data.rectificationStatus == '整改中' || data.rectificationStatus == '已整改'">
                        <span slot="left">整改开始时间</span>
                        <span slot="right">{{data.rectificationBeginDate | subTimeDay}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">限制完成时间</span>
                        <span slot="right">{{data.rectificationRestrictDate | subTimeDay}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">隐患信息</span>
                        <span slot="right" class="textarea">{{data.info | null}}</span>
                    </yd-cell-item>
                </yd-cell-group>
                <p class="title" v-if="data.rectificationStatus == '整改中' || data.rectificationStatus == '已整改'">整改记录</p>
                <yd-timeline v-if="data.rectificationStatus == '整改中' || data.rectificationStatus == '已整改'">
                    <yd-timeline-item>
                        <p>开始进行整改</p>
                        <p style="margin-top: 10px;">{{data.rectificationBeginDate}}</p>
                    </yd-timeline-item>
                    <yd-timeline-item v-for="(item,index) in rectificationData" :key="index">
                        <p>{{item.rectificationDate | subTimeMin}}【{{item.responsiblePerson}}】进行整改</p>
                        <p style="margin-top: 10px;">{{item.content}}</p>
                    </yd-timeline-item>
                </yd-timeline>
                <!--<p class="title" v-if="attach.length>0">隐患附件</p>
                        <div v-if="attach.length>0">
                            <yd-lightbox class="imgShow">
                                <yd-lightbox-img v-for="(item,key) in attach" :key="key" v-if="isImg(item.name)" :src="$store.state.link + '/attach/preview?id='+item.id" :original="$store.state.link + '/attach/preview?id='+item.id"></yd-lightbox-img>
                            </yd-lightbox>
                            <div class="fileShow">
                                <span v-for="(item,key) in attach" :key="key" v-if="!isImg(item.name)">
                                    <i class="ion-document-text"></i> {{item.name}}</span>
                            </div>
                        </div>-->
            </div>
        </Scroll>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [],
            rectificationData: [],
            attach: [],
        }
    },
    mounted() {
        $.post(this.$store.state.link + '/problem/data', {
            token: window.localStorage.getItem("token"),
            id: this.$route.params.id
        }, (data) => {
            if (data.success) {
                this.data = data.data;
                this.attachFun(data.data.id);
                if (data.data.rectificationStatus == '整改中' || data.data.rectificationStatus == '已整改') {
                    this.rectification(data.data.id)
                }
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
    methods: {
        isImg(name) {
            if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(name)) {
                return false;
            } else {
                return true
            }
        },
        attachFun(id) {
            $.post(this.$store.state.link + '/attach/listData', {
                token: window.localStorage.getItem("token"),
                fid: id
            }, (data) => {
                if (data.success) {
                    this.attach = data.data;
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
        rectification(id) {
            $.post(this.$store.state.link + '/rectification/listData', {
                token: window.localStorage.getItem("token"),
                problemId: id
            }, (data) => {
                if (data.success) {
                    this.rectificationData = data.data;
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
