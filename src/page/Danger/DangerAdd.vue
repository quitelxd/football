<style lang="less" scoped>
.DangerAdd {
    >.wrapper {
        // width: 100%;
        height: 100%;
        overflow: hidden;
        background: #f5f5f5;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter,
    .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateY(10px);
        opacity: 0;
    }
    .yd-cell-box {
        margin-bottom: 15px !important;
    }
    .dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0; // padding-top: 20px;
        background: #eee;
        overflow: hidden;
        z-index: 2;
        .enterpriseData {
            height: 100%;
            overflow-y: auto;
            .fire {
                font-size: 12px;
                color: #666;
                span {
                    margin-right: 10px;
                }
            }
            .name {
                font-weight: 600;
                margin-bottom: 5px;
            }
            .yd-cell-item {
                padding: 15px 0px 15px 12px !important;
            }
        }
    }
    .yd-cell-right {
        select {
            color: #a1a1a1;
            font-family: 'Microsoft Ya Hei'
        }
    }
    .addImg-box {
        padding: 10px;
        .img {
            float: left;
            display: block;
            height: 60px;
            width: 60px;
            border: 1px solid #eee;
            border-radius: 5px;
            margin: 0 5px;
            position: relative;
            >img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                outline: none;
            }
            .closeImg {
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 100%;
                background: #ea5238;
                color: #fff;
                text-align: center;
                line-height: 20px;
                right: -7px;
                top: -7px;
            }
        }
        .addImg {
            float: left;
            display: block;
            font-size: 36px;
            color: #888;
            height: 60px;
            width: 60px;
            border: 1px solid #eee;
            border-radius: 5px;
            text-align: center;
            line-height: 60px;
            margin: 0 5px;
        }
    }
    .radio {
        .yd-radio {
            background: #fff;
            display: block;
            padding: 10px 5px;
            position: relative;
            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                border-bottom: 1px solid #d9d9d9;
                -webkit-transform: scaleY(.5);
                transform: scaleY(.5);
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
            }
        }
    }
    .pop-head {
        padding: 4px 12px;
        .close {
            color: #999;
            float: left;
        }
        >.search-btn {
            float: right;
            color: #0bb20c;
        }
    }
}
</style>
<style>
.DangerAdd .yd-cell-title {
    font-size: 12px;
}

.DangerAdd .dialog .wrapper {
    overflow: hidden;
    height: calc(100% - 80px);
}
</style>

<template>
    <div class="DangerAdd pages">
        <yd-navbar title="隐患添加" class="head-nav" style="z-index:1 !important;">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
            <div slot="right" @click="addDanger">
                <i class="ion-checkmark-round"></i> 完成
            </div>
        </yd-navbar>
        <Scroll class="wrapper">
            <div class="content">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">单位名称：</span>
                        <input slot="right" @focus="showDialog" readonly v-model="name" type="text" placeholder="请选择单位">
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">隐患等级：</span>
                        <input slot="right" @focus="showLevel = true" readonly v-model="level" type="text" placeholder="请选择隐患等级">
                        <!--<select slot="right" v-model="level">
                                                                    <option value="">请选择隐患等级</option>
                                                                    <option value="重大隐患">重大隐患</option>
                                                                    <option value="一般隐患">一般隐患</option>
                                                                    <option value="动态隐患">动态隐患</option>
                                                                </select>-->
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">隐患信息：</span>
                        <input slot="right" @focus="infoDialogFun" readonly v-model="info" type="text" placeholder="请选择隐患信息">
                    </yd-cell-item>
                </yd-cell-group>
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">发现人：</span>
                        <input slot="right" v-model="checkPerson" type="text" placeholder="请输入发现人">
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">发现时间：</span>
                        <yd-datetime v-model="checkDate" slot="right"></yd-datetime>
                    </yd-cell-item>
                    <yd-cell-item v-if="$route.params.from == 1">
                        <span slot="left">限制整改时间：</span>
                        <yd-datetime v-model="restrictDate" type="date" slot="right"></yd-datetime>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-cell-group>
                    <yd-cell-item>
                        <yd-textarea slot="right" v-model="content" placeholder="请输入现场情况" maxlength="100"></yd-textarea>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-cell-group>
                    <yd-cell-item>
                        <yd-textarea slot="right" v-model="remark" placeholder="请输入备注" maxlength="100"></yd-textarea>
                    </yd-cell-item>
                </yd-cell-group>
                <!--<yd-cell-group title="上传图片">
                        <div class="addImg-box">
                            <div class="img" v-for="(item,index) in zFile" :key="index">
                                <img :src="item.base64Data">
                                <div class="closeImg" @click="closeImg(index)">
                                    <i class="ion-close-round"></i>
                                </div>
                            </div>
                            <span class="addImg" v-show="isaddImg" @click="typeDialog">+</span>
                            <div style="clear: both;"></div>
                        </div>
                    </yd-cell-group>-->
            </div>
        </Scroll>
        <yd-actionsheet :items="myItems" v-model="actionsheetShow" cancel="取消"></yd-actionsheet>

        <transition name="slide-fade">
            <div v-if="infoDialog" class="dialog">
                <div class="pop-head" style="padding-bottom:10px;">
                    <div class="close" @click="infoDialog = false;infoName = info;">
                        <i class="ion-close-round"></i> 关闭</div>
                    <div class="search-btn" @click="infoDialog = false;info = infoName">
                        <i class="ion-checkmark-round"></i> 确定</div>
                    <div style="clear:both;"></div>
                </div>
                <Scroll class="wrapper" style="height:calc(100% - 40px);" :data="problemData">
                    <div class="content">
                        <yd-radio-group v-model="infoName" class="radio">
                            <yd-radio v-for="(item,index) in problemData" :key="index" :val="item.value">{{item.value}}</yd-radio>
                        </yd-radio-group>
                    </div>
                </Scroll>
            </div>
        </transition>

        <transition name="slide-fade">
            <div v-if="show1" class="dialog">
                <div class="enterpriseData">
                    <div class="pop-head">
                        <div class="close" @click="show1 = false;">
                            <i class="ion-close-round"></i> 关闭</div>
                        <div class="search-btn" @click="enterpriseData=[];page=1;getEnterpriseData();">
                            <i class="ion-ios-search-strong"></i> 查找</div>
                        <div style="clear:both;"></div>
                    </div>
                    <Search v-model="enterpriseName" placeholder="按企业名称查找"></Search>
                    <Scroll class="wrapper" :data="enterpriseData" @scrollToEnd="getEnterpriseData">
                        <div class="content">
                            <yd-cell-item v-for="(item,index) in enterpriseData" :key='index' @click.native="callback(item.name,item.id)">
                                <span slot="left">
                                    <p class="name">{{item.name}}</p>
                                    <p class="fire">
                                        <span style="color: #409EFF;">{{item.fireJurisdiction}}</span>
                                        <span v-if="item.acceptanceStatus == '已验收'" style="color: #409EFF;">{{item.acceptanceStatus}}</span>
                                        <span v-if="item.acceptanceStatus == '未验收'" style="color: #EB9E05;">{{item.acceptanceStatus}}</span>
                                        <span style="color: #409EFF;">{{item.scale}}</span>
                                    </p>
                                </span>
                                <span slot="right"></span>
                                <span slot="right">{{item.rectificationStatus}}</span>
                            </yd-cell-item>
                            <ScrLoadingWrapperoll :isloading="isloading" @onRefresh="searchBtnFun"></ScrLoadingWrapperoll>
                        </div>
                    </Scroll>
                </div>
            </div>
        </transition>

        <yd-popup v-model="showLevel" position="bottom" height="40%">
            <div class="pop-head" style="padding-bottom:10px;">
                <div class="close" @click="showLevel = false;">
                    <i class="ion-close-round"></i> 关闭</div>
                <div class="search-btn" @click="showLevel = false;level = levelChangeName">
                    <i class="ion-checkmark-round"></i> 确定</div>
                <div style="clear:both;"></div>
            </div>
            <div style="height:70%; overflow:hidden;">
                <mt-picker :slots="levelData" @change="levelChange"></mt-picker>
            </div>
        </yd-popup>
    </div>
</template>
<script>
import { Picker } from 'mint-ui';
import 'mint-ui/lib/picker/style.css'
import 'mint-ui/lib/style.css'
import Search from '../../components/Search'
export default {
    components: {
        Search,
        'mt-picker': Picker
    },
    data() {
        return {
            name: '',
            enterpriseId: '',
            info: '',
            remark: '',
            content: '',
            restrictDate: '',
            checkDate: '',
            checkPerson: '',
            level: '',
            levelData: [{ values: ['一般隐患', '重大隐患', '动态隐患'] }],
            levelChangeName: '',
            show1: false,
            enterpriseName: '',
            enterpriseData: [],
            isloading: true,
            page: 1,
            dataSize: 0,
            actionsheetShow: false,
            zFile: [],  // 图片   
            isaddImg: true,
            infoDialog: false,
            problemData: [],
            infoName: '',
            myItems: [
                {
                    label: '拍照',
                    callback: () => {
                        api.getPicture({
                            sourceType: 'camera',  // 调用类型
                            encodingType: 'jpg',
                            mediaValue: 'pic',
                            destinationType: 'base64',
                            allowEdit: false,
                            quality: 30,
                            saveToPhotoAlbum: false
                        }, (ret, err) => {
                            if (err) {
                                this.$dialog.toast({ mes: err.msg, timeout: 300, icon: 'error' });
                                return false;
                            }
                            if (ret.data) {
                                this.$dialog.loading.open('');
                                $.post(this.$store.state.link + '/attach/upload', {
                                    token: window.localStorage.getItem("token"),
                                    type: 'AM_PROBLEM',
                                    file: ret.base64Data,
                                    file_url: ret.data
                                }, (data) => {
                                    // alert(JSON.stringify(data))
                                    if (data.success) {
                                        this.zFile.push({ id: data.data[0].id, name: data.data[0].name, base64Data: ret.base64Data });
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
                                    this.$dialog.loading.close();
                                })
                            } else {

                            }
                        });
                    }
                },
                {
                    label: '选择照片',
                    callback: () => {
                        api.getPicture({
                            sourceType: 'album',  // 调用类型
                            encodingType: 'jpg',
                            mediaValue: 'pic',
                            destinationType: 'base64',
                            allowEdit: false,
                            quality: 30,
                            saveToPhotoAlbum: false
                        }, (ret, err) => {
                            if (err) {
                                this.$dialog.toast({ mes: err.msg, timeout: 300, icon: 'error' });
                                return false;
                            }
                            if (ret.data) {
                                this.$dialog.loading.open('');
                                $.post(this.$store.state.link + '/attach/upload', {
                                    token: window.localStorage.getItem("token"),
                                    type: 'AM_PROBLEM',
                                    file: ret.base64Data,
                                    file_url: ret.data
                                }, (data) => {
                                    // alert(JSON.stringify(data))
                                    if (data.success) {
                                        this.zFile.push({ id: data.data[0].id, name: data.data[0].name, base64Data: ret.base64Data });
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
                                    this.$dialog.loading.close();
                                })
                            } else {

                            }
                        });
                    }
                }
            ],
            showLevel: false
        }
    },
    watch: {
        zFile(a) {
            if (a.length >= 3) {
                this.isaddImg = false
            } else {
                this.isaddImg = true
            }
        }
    },
    destroyed() {
        this.$dialog.loading.close();
    },
    mounted() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hours = date.getHours();
        if (hours >= 0 && hours <= 9) {
            hours = "0" + hours;
        }
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + date.getMinutes();
        this.checkDate = currentdate;
        this.restrictDate = currentdate;
    },
    watch: {
        show1(val) {
            if (!val) {
                this.enterpriseData = [];
            }
        }
    },
    methods: {
        levelChange(picker, value) {
            this.levelChangeName = value.join(',')
        },
        infoDialogFun() {
            this.infoDialog = true;
            $.post(this.$store.state.link + '/attr/listData', {
                token: window.localStorage.getItem("token"),
                key: 'YHNR'
            }, (data) => {
                if (data.success) {
                    this.problemData = data.data;
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
        closeImg(index) {
            this.$dialog.loading.open('');
            $.post(this.$store.state.link + '/attach/delete', {
                token: window.localStorage.getItem("token"),
                id: this.zFile[index].id
            }, (data) => {
                if (data.success) {
                    this.zFile.splice(index, 1);
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
                this.$dialog.loading.close();
            })
        },
        typeDialog() {
            this.actionsheetShow = true;
        },
        addDanger() {
            if (this.name == '') {
                this.$dialog.toast({ mes: '请选择单位', timeout: 300, icon: 'error' });
                return false;
            } else if (this.info == '') {
                this.$dialog.toast({ mes: '请输入隐患信息', timeout: 300, icon: 'error' });
                return false;
            } else if (this.content == '') {
                this.$dialog.toast({ mes: '请输入现场情况', timeout: 300, icon: 'error' });
                return false;
            } else if (this.checkDate == '') {
                this.$dialog.toast({ mes: '请选择发现时间', timeout: 300, icon: 'error' });
                return false;
            } else if (this.checkPerson == '') {
                this.$dialog.toast({ mes: '请输入发现人', timeout: 300, icon: 'error' });
                return false;
            } else if (this.level == '') {
                this.$dialog.toast({ mes: '请选择隐患等级', timeout: 300, icon: 'error' });
                return false;
            } else {
                let files = '';
                for (let i = 0; i < this.zFile.length; i++) {
                    if (i == this.zFile.length - 1) {
                        files += this.zFile[i].id;
                    } else {
                        files += this.zFile[i].id + ','
                    }
                }
                let params = {};
                if (this.$route.params.from == 1) {
                    params = {
                        token: window.localStorage.getItem("token"),
                        enterpriseId: this.enterpriseId,
                        info: this.info,
                        fromType: '执法APP',
                        level: this.level,
                        content: this.content,
                        checkPerson: this.checkPerson,
                        checkDate: this.checkDate,
                        restrictDate: this.restrictDate,
                        remark: this.remark,
                        files: files
                    }
                } else if (this.$route.params.from == 2) {
                    params = {
                        token: window.localStorage.getItem("token"),
                        enterpriseId: this.enterpriseId,
                        info: this.info,
                        fromType: '网格化',
                        level: this.level,
                        content: this.content,
                        checkPerson: this.checkPerson,
                        checkDate: this.checkDate,
                        remark: this.remark,
                        files: files
                    }
                }

                $.post(this.$store.state.link + '/problem/add', params, (data) => {
                    if (data.success) {
                        this.$dialog.toast({
                            mes: data.msg,
                            timeout: 500,
                            icon: 'success',
                            callback: () => {
                                if (this.$route.params.from == 1) {
                                    this.$router.push('/Danger/isAdd')
                                } else if (this.$route.params.from == 2) {
                                    this.$router.push('/reportProblem/isAdd')
                                }


                            }
                        });
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
        },
        showDialog() {
            this.show1 = true;
            this.page = 1;
            this.getEnterpriseData();
        },
        searchBtnFun() {
            this.enterpriseData = [];
            this.page = 1;
            this.getEnterpriseData();
        },
        getEnterpriseData() {
            if (this.page != 1 && this.enterpriseData.length >= this.dataSize) {
                this.isloading = false;
                return false;
            }

            this.isloading = true;
            $.post(this.$store.state.link + '/enterprise/listData', {
                token: window.localStorage.getItem("token"),
                all: false,
                offset: (this.page - 1) * 20,
                limit: 20,
                name: this.enterpriseName
            }, (data) => {
                if (data.success) {
                    this.dataSize = data.total;
                    for (var item of data.data) {
                        this.enterpriseData.push(item);
                    }
                    this.page++;
                    if (this.enterpriseData.length >= this.dataSize) {
                        this.isloading = false;
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
        callback(name, id) {
            this.show1 = false;
            this.name = name;
            this.enterpriseId = id;
        }
    }
}
</script>
