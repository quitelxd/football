<style lang="less">
.login {
    width: 100%;
    height: 100%;
    padding: 0 30px;
    padding-top: 25%;
    background: url(../assets/img/loginBg.jpg);
    background-size: 100% 100%;
    .title {
        color: #ff7521;
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 3rem;
        text-shadow: 0 0 1px rgba(255, 255, 255, .6);
    }
    .yd-cell-box {
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 17.5px !important;
    }
    .yd-cell {
        background: rgba(255, 255, 255, .7) !important;
    }
    .yd-cell-item {
        background: rgba(255, 255, 255, .7) !important;
    }
    .footer {
        font-size: 12px;
        color: #444;
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: 3rem;
        left: 0;
    }
    .yd-btn-block {
        // border: 2px solid rgba(255,255,255, .8);
        background: -webkit-linear-gradient(to right, #ff6011, #ffa026) !important;
        background: -moz-linear-gradient(to right, #ff6011, #ffa026) !important;
        background: -o-linear-gradient(to right, #ff6011, #ffa026) !important;
        background: linear-gradient(to right, #ff6011, #ffa026) !important;
        font-family: '微软雅黑';
    }
    .yd-cell-left {
        i {
            font-size: 2rem;
            margin-right: 8px;
        }
    }
    .register {
        color: #9c9c9c;
        text-align: right;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>
<template>
    <div class="login">
        <h1 class="title"></h1>
        <br>
        <br>
        <br>
        <br>
        <div class="form">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">
                        <i class="ion-person"></i>
                    </span>
                    <yd-input slot="right" @keydown.enter.native="login" required v-model="username" max="20" placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        <i class="ion-locked"></i>
                    </span>
                    <yd-input slot="right" @keydown.enter.native="login" type="password" v-model="password" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        <div class="register" @click="register()">立即注册</div>
        <yd-button color='#fff' size="large" @click.native="login">
            登录
        </yd-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            userType: 'police'
        }
    },
    mounted() {
    },
    methods: {
        register() {
            this.$router.push('/Register')
        },
        dd() {
            var ajpush = api.require('ajpush');
            ajpush.init(function(ret) {
                if (ret && ret.status) {
                    // alert('初始化成功')
                }
            });
            ajpush.setListener(
                function(ret) {
                    // alert('监听成功')
                }
            );
            var param = {
                alias: this.username
            };
            ajpush.bindAliasAndTags(param, function(ret) {
                // alert('绑定用户成功')
                var statusCode = ret.statusCode;
            });
            ajpush.setListener(
                //监听发的消息  不是通知
                (ret) => {
                    var extra = ret.extra.type;
                    if (extra == 1) {
                        this.$store.state.isDot = true
                    } else if (extra == 0) {
                        this.$store.state.isDot1 = true
                    }

                }
            );
            api.addEventListener({
                name: 'appintent'
            }, (ret, err) => {
                if (ret && ret.appParam.ajpush) {
                    var ajpush = ret.appParam.ajpush;
                    var id = ajpush.id;
                    var title = ajpush.title;
                    var content = ajpush.content;
                    var extra = ajpush.extra;
                    if (extra.type == 1) {
                        this.$router.push('/Home/UnitInfo')
                        this.$store.state.homeNavTitle = '热门推荐';
                        this.$store.state.homeNavActive = 2;
                    } else if (extra.type == 0) {
                        this.$router.push('/Home/Work')
                        this.$store.state.homeNavTitle = '比赛推荐';
                        this.$store.state.homeNavActive = 0;
                    }
                }
            })
        },
        login() {
            $.post(IPhost + '/loginapi/login', {
                username: this.username,
                password: this.password,
            }, (data) => {
                if (data.success) {
                    this.$dialog.toast({
                        mes: '登录成功',
                        timeout: 1500,
                        icon: 'success'
                    });
                    window.localStorage.setItem("token", data.token)
                    window.localStorage.setItem("userName", this.username)
                    window.localStorage.setItem("passWord", this.password)
                    this.$router.push('/')
                    this.dd();
                } else {
                    if (data.code == 7788945) {
                        this.$dialog.toast({
                            mes: '超过期限',
                            timeout: 1000,
                            icon: 'error'
                        });
                    } else {
                        this.$dialog.toast({
                            mes: data.msg,
                            timeout: 1000,
                            icon: 'error'
                        });
                    }
                    this.username = '';
                    this.password = '';
                }
            })
        }
    }

}

</script>