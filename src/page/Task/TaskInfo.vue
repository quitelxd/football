<style lang="less" scoped>
.task-info {
    .wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .content {
            .default {
                color: #888;
                text-align: center;
                padding: 2rem 0;
            }
            .smallTitle {
                color: #999;
                font-size: 12px;
            }
            .content {
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
                .padding {
                    width: 10%;
                }
                padding: 15px;
                .smallTitle {
                    margin-bottom: 5px;
                }
                .yd-flexbox {
                    margin-bottom: 15px;
                }
            }
        }
    }
}
</style>

<template>
    <div class="task-info pages">
        <yd-navbar title="任务详情" class="head-nav">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
            <div slot="right" @click="checkBtn" v-if="isover == '待办任务'">
                <i class="ion-compose" style="font-size: 2rem;"></i>
            </div>
        </yd-navbar>

        <Scroll class="wrapper" :data="data">
            <div class="content">
                <yd-tab>
                    <yd-tab-panel label="任务记录">
                        <yd-timeline>
                            <yd-timeline-item>
                                <p>
                                    <span v-if="type == '隐患上报'">【{{otherData.level}}】</span>
                                    <span v-if="type == '监督检查'">【监督检查】</span>
                                    {{otherData.enterpriseName}}</p>
                                <p v-if="type == '监督检查'">主办人 {{otherData.mainPerson}}</p>
                                <p v-if="type == '监督检查'">协办人 {{otherData.assistPerson}}</p>
                                <p v-if="type == '监督检查'">检查期限 {{otherData.startTime}}至{{otherData.endTime}}</p>
                                <p v-if="type == '隐患上报'">来源：{{otherData.fromType}}</p>
                                <p v-if="type == '隐患上报'">{{otherData.info}}</p>
                                <p style="margin-top: 10px;">{{data.starTime | subTimeMin}} {{data.startOrg}} {{data.startPerson}}</p>
                            </yd-timeline-item>
                            <yd-timeline-item v-for="(item,index) in data.taskList" :key="index">
                                <p>{{item.comment}}</p>
                                <p style="margin-top: 10px;">{{item.handleTime | subTimeMin}} {{item.handleOrg}} {{item.handlePerson}}</p>
                            </yd-timeline-item>
                        </yd-timeline>
                    </yd-tab-panel>
                    <yd-tab-panel label="检查信息" v-if="type == '监督检查'">
                        <!--<p class="smallTitle" style="padding:10px;background:#f5f5f5;">基本信息</p>-->
                        <div class="content">
                            <yd-flexbox>
                                <div class="padding"></div>
                                <yd-flexbox-item>
                                    <p class="smallTitle">检查单位</p>
                                    {{otherData.enterpriseName}}
                                </yd-flexbox-item>
                                <yd-flexbox-item>
                                    <p class="smallTitle">检查状态</p>
                                    {{otherData.checkStatus}}
                                </yd-flexbox-item>
                            </yd-flexbox>
                            <yd-flexbox>
                                <div class="padding"></div>
                                <yd-flexbox-item>
                                    <p class="smallTitle">消防管辖</p>
                                    {{otherData.fireJurisdiction}}
                                </yd-flexbox-item>
                                <yd-flexbox-item>
                                    <p class="smallTitle">项目类别</p>
                                    {{otherData.projectType}}
                                </yd-flexbox-item>
                            </yd-flexbox>
                            <yd-flexbox>
                                <div class="padding"></div>
                                <yd-flexbox-item>
                                    <p class="smallTitle">主办人</p>
                                    {{otherData.mainPerson}}
                                </yd-flexbox-item>
                                <yd-flexbox-item>
                                    <p class="smallTitle">协办人</p>
                                    {{otherData.assistPerson}}
                                </yd-flexbox-item>
                            </yd-flexbox>
                        </div>
                    </yd-tab-panel>
                    <yd-tab-panel label="隐患信息" v-if="type == '隐患上报'">
                        <div class="content">
                            <yd-flexbox>
                                <div class="padding"></div>
                                <yd-flexbox-item>
                                    <p class="smallTitle">隐患单位</p>
                                    {{otherData.enterpriseName}}
                                </yd-flexbox-item>
                                <yd-flexbox-item>
                                    <p class="smallTitle">隐患来源</p>
                                    {{otherData.fromType}}
                                </yd-flexbox-item>
                            </yd-flexbox>
                            <yd-flexbox>
                                <div class="padding"></div>
                                <yd-flexbox-item>
                                    <p class="smallTitle">隐患等级</p>
                                    {{otherData.level}}
                                </yd-flexbox-item>
                                <yd-flexbox-item>
                                    <p class="smallTitle">发生时间</p>
                                    {{otherData.checkDate}}
                                </yd-flexbox-item>
                            </yd-flexbox>
                            <yd-flexbox>
                                <div class="padding"></div>
                                <yd-flexbox-item>
                                    <p class="smallTitle">隐患信息</p>
                                    {{otherData.info}}
                                </yd-flexbox-item>
                            </yd-flexbox>
                            <yd-flexbox>
                                <div class="padding"></div>
                                <yd-flexbox-item>
                                    <p class="smallTitle">现场情况</p>
                                    {{otherData.content}}
                                </yd-flexbox-item>
                            </yd-flexbox>
                            <div v-if="attach.length>0">
                                <yd-lightbox class="imgShow">
                                    <yd-lightbox-img v-for="(item,key) in attach" :key="key" v-if="isImg(item.name)" :src="$store.state.link + '/attach/preview?id='+item.id" :original="$store.state.link + '/attach/preview?id='+item.id"></yd-lightbox-img>
                                </yd-lightbox>
                                <div class="fileShow">
                                    <span v-for="(item,key) in attach" :key="key" v-if="!isImg(item.name)">
                                        <i class="ion-document-text"></i> {{item.name}}</span>
                                </div>
                            </div>
                        </div>
                    </yd-tab-panel>
                </yd-tab>
            </div>
        </Scroll>

    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            otherData: [],
            type: this.$route.params.type,
            isover: this.$route.params.over,
            attach: []
        }
    },
    computed: {
    },
    mounted() {
        $.post(this.$store.state.link + '/task/data', {
            token: window.localStorage.getItem("token"),
            procId: this.$route.params.id
        }, (data) => {
            if (data.success) {
                this.data = data.data;
                if (this.type == '监督检查') {
                    this.check(data.data.eventId);
                } else if (this.type == '隐患上报') {
                    this.problem(data.data.eventId);
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
                        this.$router.push('/Login')
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
        problem(id) {
            $.post(this.$store.state.link + '/problem/data', {
                token: window.localStorage.getItem("token"),
                id: id
            }, (data) => {
                if (data.success) {
                    this.otherData = data.data;
                    this.attachFun(data.data.id);
                } else {
                    if (data.msg == 'token有误或超时！') {
                        this.$router.push('/Login')
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
        check(id) {
            $.post(this.$store.state.link + '/check/data', {
                token: window.localStorage.getItem("token"),
                id: id
            }, (data) => {
                if (data.success) {
                    this.otherData = data.data;
                } else {
                    if (data.msg == 'token有误或超时！') {
                        this.$router.push('/Login')
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
        checkBtn() {
            this.$dialog.alert({ mes: '监督检查任务处理请至PC端操作！' });
            // if (this.type == '监督检查') {
            //     this.$dialog.alert({ mes: '监督检查任务处理请至PC端操作！' });
            // } else {
            //     this.$router.push('/ProblemCheck')
            // }
        }
    }
}
</script>
