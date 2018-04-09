<style lang="less" scoped>
.SuperviseInfo {
    .content {
        .banner {
            width: 100%;
        }
        .small {
            font-size: 12px;
            margin-bottom: 5px;
            color: #999;
        }
        .page {
            background: #fff;
            position: relative;
            padding: 10px 0;
            padding-left: 1rem;
            div {
                float: left;
                width: 100%;
                padding-left: 2rem;
                position: relative;
                min-height: 5rem;
                i {
                    position: absolute;
                    left: 1.5rem;
                    font-size: 30px;
                    color: #fd7373;
                }
                p {
                    margin-left: 2.7rem;
                }
            }
            &:after {
                content: '';
                display: block;
                clear: both;
            }
        }
    }
}
</style>
<template>
    <div class="SuperviseInfo pages">
        <yd-navbar title="单位信息" class="head-nav">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
        </yd-navbar>
        <div class="content">
            <img class="banner" src="../../assets/img/supervieInfoBg.jpg" alt="">
            <div class="page">
                <div>
                    <i class="ion-ios-home-outline"></i>
                    <p class="small">单位名称</p>
                    <p>{{data.enterpriseName}}</p>
                </div>
                <div>
                    <i class="ion-location"></i>
                    <p class="small">消防管辖</p>
                    <p>{{data.fireJurisdiction}}</p>
                </div>
                <div>
                    <i class="ion-compose"></i>
                    <p class="small">检查状态</p>
                    <p>{{data.checkStatus}}</p>
                </div>
                <div>
                    <i class="ion-android-person"></i>
                    <p class="small">主办人</p>
                    <p>{{data.mainPerson}}</p>
                </div>
                <div>
                    <i class="ion-paperclip"></i>
                    <p class="small">项目类别</p>
                    <p>{{data.projectType}}</p>
                </div>
                <div>
                    <i class="ion-ios-people"></i>
                    <p class="small">协办人</p>
                    <p>{{data.assistPerson}}</p>
                </div>
                <div v-if="data.checkTime">
                    <i class="ion-clock"></i>
                    <p class="small">检查时间</p>
                    <p>{{data.checkTime}}</p>
                </div>
                <div v-if="data.checkTime">
                    <i class="ion-calendar"></i>
                    <p class="small">检查期限</p>
                    <p>{{data.startTime}}至{{data.endTime}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            $.post(this.$store.state.link + '/check/data', {
                token: window.localStorage.getItem("token"),
                id: this.$route.params.id
            }, (data) => {
                if (data.success) {
                    this.data = data.data
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
        })
    }
}
</script>

