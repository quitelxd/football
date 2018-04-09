<style lang="less" scoped>
.unitInfoContent {
    .wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .content {
        .name {
            padding: 15px;
            background: #fff;
            position: relative;
            .logo {
                position: absolute;
                display: block;
                background: #ff6915;
                width: 50px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                top: -24px;
                left: 15px;
                height: 50px;
                padding: 5px;
                border-radius: 5px;
            }
            div.title {
                width: 100%;
                text-align: center;
                font-size: 20px;
                line-height: 45px;
            }
            .yd-flexbox-item-center {
                text-align: center;
                font-size: 16px;
                color: #777;
                span {
                    display: block;
                    color: #fff;
                    border-radius: 3px;
                    margin-top: 10px;
                    padding: 1px 0;
                    font-size: 10px;
                }
            }
        }
        .smallTitle {
            color: #999;
            font-size: 12px;
        }
        .content {
            padding: 15px;
            background: #fff;
            .smallTitle {
                margin-bottom: 5px;
            }
            .yd-flexbox {
                margin-bottom: 15px;
            }
        }
    }
}

.yd-flexbox-item {
    margin: 0 2.2rem;
}
</style>
<template>
    <div class="unitInfoContent pages">
        <yd-navbar title="推荐消息" class="head-nav">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
        </yd-navbar>

        <Scroll class="wrapper" :data="enterpriseData">
            <div class="content">
               <div class="content">
                   {{enterpriseData.mess_id.messagecontent}}
                   <p style="text-align:right;font-size:12px;color:#aaa;">{{enterpriseData.cdate}}</p>
               </div>
            </div>
        </Scroll>
    </div>
</template>
<script>
export default {
    data() {
        return {
            enterpriseData: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            $.post(this.$store.state.link + '/message/getmessbyid', {
                mess_user_id: this.$route.params.id
            }, (data) => {
                this.enterpriseData = data
            })
        })
    }
}
</script>

