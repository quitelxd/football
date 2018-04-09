<style lang="less">
.me {
    padding-top: 15px;
    .yd-cell-icon {
        font-size: 2rem;
        margin-right: 10px;
    }
    .yd-popup-show {
        padding: 15px 10px;
    }
    .logOut {
        min-height: 50px;
        line-height: 50px;
        font-size: 1.6rem;
        text-align: center;
        background: #fff;
        box-shadow: 3px 3px 3px 3px #eee;
    }
    .yd-cell-left {
        i {
            color: #ec7777;
        }
    }
    .yd-cell-box {
        margin-bottom: 17.5px !important;
    }
}
</style>
<template>
    <div class="me">
        <yd-cell-group>
            <yd-cell-item>
                <i class="ion-person" slot="icon"></i>
                <span slot="left">用户名</span>
                <span slot="right">{{userInfo.name}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <i class="ion-ios-telephone" slot="icon"></i>
                <span slot="left">联系方式</span>
                <span slot="right">{{userInfo.phone}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <i class="ion-email" slot="icon"></i>
                <span slot="left">邮箱</span>
                <span slot="right">{{userInfo.email}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <i class="ion-ios-keypad-outline" slot="icon"></i>
                <span slot="left">用户类型</span>
                <span slot="right" v-if="userInfo.type == 'enterprise'">企业用户</span>
                <span slot="right" v-if="userInfo.type == 'police'">消防用户</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
            <yd-cell-item @click.native="show1 = true" href="#" type="link">
                <i class="ion-locked" slot="icon"></i>
                <span slot="left">更改密码</span>
            </yd-cell-item>
        </yd-cell-group>

        <div @click="logOut" class="logOut">
            <span>退出登录</span>
        </div>

        <yd-popup v-model="show1" position="center" width="90%">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">旧密码：</span>
                    <yd-input slot="right" type="password" v-model="oldPassWord" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">新密码：</span>
                    <yd-input slot="right" type="password" v-model="newPassword" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">再次输入：</span>
                    <yd-input slot="right" type="password" v-model="againNew" placeholder="请确认密码"></yd-input>
                </yd-cell-item>
                <yd-button @click.native="modifyPwd" size="large">确认修改</yd-button>
            </yd-cell-group>
        </yd-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {},
            show1: false,
            oldPassWord: '',
            newPassword: '',
            againNew: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            // $.post(this.$store.state.link + '/user/data', {
            //     token: window.localStorage.getItem("token")
            // }, (data) => {
            //     if (data.success) {
            //         this.userInfo = data.data;
            //     } else {
            //         if (data.msg == 'token有误或超时！') {
            //              window.localStorage.clear()
            //            this.$router.go(0)
            //         } else {
            //             this.$dialog.toast({
            //                 mes: data.msg,
            //                 timeout: 500,
            //                 icon: 'error'
            //             });
            //         }
            //     }
            // })
        })
    },
    watch: {
        show1(val) {
            if (!val) {
                //清空
                this.oldPassWord = '';
                this.newPassword = '';
                this.againNew = '';
            }
        }
    },
    methods: {
        modifyPwd() {
            if (!this.oldPassWord) {
                this.$dialog.alert({ mes: '请输入旧密码!' });
            } else if (!this.newPassword) {
                this.$dialog.alert({ mes: '请输入新密码!' });
            } else if (this.newPassword != this.againNew) {
                this.$dialog.alert({ mes: '两次密码不一致!' });
            } else {
                $.post(this.$store.state.link + '/userapi/changePassword', {
                    token: window.localStorage.getItem("token"),
                    username: window.localStorage.getItem("userName"),
                    newPassword: this.newPassword,
                    oldPassword: this.oldPassWord
                }, (data) => {
                    if (typeof data != 'object') {
                        data = JSON.parse(data);
                    }
                    if (data.code == 200) {
                        this.$dialog.toast({
                            mes: data.msg,
                            timeout: 500,
                            icon: 'success',
                            callback: () => {
                                this.show1 = false;
                            }
                        });
                    } else {
                        this.$dialog.toast({
                            mes: data.msg,
                            timeout: 500,
                            icon: 'error'
                        });
                    }
                })
            }
        },
        logOut() {
            this.$dialog.confirm({
                title: '退出登录',
                mes: '此操作将退出登录,是否继续?',
                opts: () => {
                    this.$store.state.homeNavTitle = '';
                    this.$store.state.homeNavActive = '';
                    this.$store.state.dangerMenu = '';
                    window.localStorage.clear();
                    this.$router.push('/Login');
                }
            });
        }
    }
}
</script>
