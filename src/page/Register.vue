<style lang="less" scoped>
.register {
    .content {
        height: 100%;
        background: #fff;
        padding: 20px;
        .iconfont {
            margin-right: 10px;
        }
    }
    .el-select {
        display: block;
    }
}
</style>
<template>
    <div class="register pages">
        <yd-navbar title="注册账号" class="head-nav">
            <div @click="$router.back()" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon> 返回
            </div>
        </yd-navbar>
        <div class="content">
            <el-form :model="ruleForm" label-position="right" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input placeholder="请输入用户名" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pwd"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="pwd1">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pwd1"></el-input>
                </el-form-item>
                <el-form-item label="推荐人" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择推荐人">
                        <el-option v-for="item in options" :label="item.refereeName" :key="item.refereeId" :value="item.refereeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        <i class="icon iconfont ion-log-in"></i>注 册</el-button>
                    <el-button @click="resetForm('ruleForm')">
                        <i class="icon iconfont ion-close-round"></i>清 空</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.pwd1 !== '') {
                    this.$refs.ruleForm.validateField('pwd1');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                name: '',
                pwd: '',
                pwd1: '',
                region: ''
            },
            options: [],
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                pwd1: [
                    { required: true, message: '请再次输入', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        $.post(IPhost + '/registapi/getrefereeList', {}, (data) => {
            if (typeof data != 'object') {
                data = JSON.parse(data);
            }
            console.log(data)
            if (data.code == 200) {
                this.options = data.data.referee;
            } else if (data.success == false) {
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    $.post(IPhost + '/registapi/userRegister', {
                        username: this.ruleForm.name,
                        password: this.ruleForm.pwd,
                        refereeId: this.ruleForm.region
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
                                    this.$router.push('/Login')
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
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
