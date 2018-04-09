<style lang="less" scoped>
.AddSupervise {
    .wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #f5f5f5;
        .content {
            padding-top: 10px;
            .btn {
                text-align: center;
                button {
                    margin-top: 1rem;
                    width: 100%;
                    height: 3rem;
                }
            }
        }
    }
    .pop-head {
        background: #eee;
        width: 100%;
        padding: 0 15px;
        padding-top: 10px;
        .close {
            float: left;
            color: #999;
        }
        .search-btn {
            float: right;
            color: #67C23A;
        }
        i {
            font-size: 15px;
        }
    }
    .dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #eee;
        // padding-top: 20px;
        overflow: hidden;
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
    .yd-cell-right {
        select {
            color: #a1a1a1;
            font-family: 'Microsoft Ya Hei'
        }
    }
    .btnP {
        padding: 1rem;
        position: relative;
        &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            transform: scaleY(.4);
            background: #ddd;
        }
    }
}
</style>
<style>
.AddSupervise .dialog .wrapper {
    height: calc(100% - 80px);
}
</style>
<template>
    <div class="AddSupervise pages">
        <yd-navbar title="新增监督检查" class="head-nav">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
            <div slot="right" @click="save">
                <i class="ion-checkmark-round"></i> 完成
            </div>
        </yd-navbar>
        <Scroll class="wrapper">
            <div class="content">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">单位：</span>
                        <input slot="right" @focus="showDialog" readonly v-model="name" type="text" placeholder="请选择单位">
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">限制开始时间：</span>
                        <yd-datetime type="date" v-model="startTime" slot="right"></yd-datetime>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">限制结束时间：</span>
                        <yd-datetime type="date" v-model="endTime" slot="right"></yd-datetime>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">项目类别：</span>
                        <input slot="right" v-model="projectType" type="text" placeholder="请输入项目类别">
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">主办人：</span>
                        <input slot="right" v-model="mainPerson" @focus="openDialog()" readonly type="text" placeholder="请选择主办人">
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">协办人：</span>
                        <input slot="right" v-model="assistPerson" @focus="openDialog1()" readonly type="text" placeholder="请选择协办人">
                    </yd-cell-item>
                </yd-cell-group>
            </div>
        </Scroll>
        <transition name="slide-fade">
            <div v-if="show1" class="dialog">
                <div class="enterpriseData">
                    <div class="pop-head">
                        <div class="close" @click="show1 = false;enterpriseData=[];page=1">
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

        <yd-popup v-model="show2" position="bottom" height="60%" width="100%" :close-on-masker='false'>
            <yd-radio-group v-model="mainPersonId">
                <p class="btnP" v-for="(item,index) in transacrotData" :key="index">
                    <yd-radio :val="item.id" :disabled='item.disabled'>{{item.name}}</yd-radio>
                </p>
            </yd-radio-group>
            <p style="text-align:center;">
                <yd-button type="primary" style="width:90%;" @click.native="disabledFun">确 定</yd-button>
            </p>
        </yd-popup>

        <yd-popup v-model="show3" position="bottom" height="60%" width="100%" :close-on-masker='false'>
            <yd-checklist v-model="assistPersonId">
                <yd-checklist-item v-for="(item,index) in transacrotData" :disabled='item.disabled' :val='item.id' :key="index">
                    <div style="height: 50px;line-height: 50px;">{{item.name}}</div>
                </yd-checklist-item>
            </yd-checklist>
            <p style="text-align:center;">
                <yd-button type="primary" style="width:90%;" @click.native="disabled1Fun()">确 定</yd-button>
            </p>
        </yd-popup>
    </div>
</template>
<script>
import Search from '../../components/Search'
export default {
    components: {
        Search
    },
    data() {
        return {
            startTime: '',
            endTime: '',
            projectType: '',
            mainPerson: '',
            mainPersonId: '',
            assistPerson: [],
            assistPersonId: [],
            name: '',

            enterpriseId: '',
            show1: false,
            page: 1,
            dataSize: 0,
            isloading: true,
            enterpriseName: '',
            enterpriseData: [],

            show2: false,
            transacrotData: [],
            show3: false,


        }
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
        this.startTime = currentdate;
        this.endTime = currentdate;
        this.getmainPersonId();
    },
    methods: {
        openDialog() {
            this.show2 = true;
            if (this.mainPersonId) {
                for (let i = 0; i < this.transacrotData.length; i++) {
                    if (this.transacrotData[i].id == this.mainPersonId) {
                        this.transacrotData[i].disabled = false
                    }
                }
            }
        },
        disabledFun() {
            this.show2 = false;
            if (this.mainPersonId) {
                for (let i = 0; i < this.transacrotData.length; i++) {
                    if (this.transacrotData[i].id == this.mainPersonId) {
                        this.transacrotData[i].disabled = true
                        this.mainPerson = this.transacrotData[i].name;
                    }
                }
            }
        },
        openDialog1() {
            this.show3 = true;
            for (let i = 0; i < this.transacrotData.length; i++) {
                for (let j = 0; j < this.assistPersonId.length; j++) {
                    if (this.transacrotData[i].id == this.assistPersonId[j]) {
                        this.transacrotData[i].disabled = false
                    }
                }
            }
        },
        disabled1Fun() {
            this.show3 = false;
            var arr = [];
            for (let i = 0; i < this.transacrotData.length; i++) {
                for (let j = 0; j < this.assistPersonId.length; j++) {
                    if (this.transacrotData[i].id == this.assistPersonId[j]) {
                        this.transacrotData[i].disabled = true
                        arr.push(this.transacrotData[i].name)
                    }
                }
            }
            this.assistPerson = arr
        },
        showDialog() {
            this.show1 = true;
            this.page = 1;
            this.getEnterpriseData();
        },
        getmainPersonId() {
            this.transacrotData = [];
            $.post(this.$store.state.link + '/check/transactor', {
                token: window.localStorage.getItem("token"),
            }, (data) => {
                if (data.success) {
                    this.transacrotData = data.data;
                    for (var i = 0; i < data.data.length; i++) {
                        this.transacrotData[i].disabled = false
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
            this.enterpriseData=[];
            this.page=1;
            this.show1 = false;
            this.name = name;
            this.enterpriseId = id;
        },
        save() {
            if (this.name == '') {
                this.$dialog.toast({ mes: '请选择单位', timeout: 500, icon: 'error' });
                return false;
            } else if (this.startTime == '') {
                this.$dialog.toast({ mes: '请选择限制开始时间', timeout: 500, icon: 'error' });
                return false;
            } else if (this.endTime == '') {
                this.$dialog.toast({ mes: '请选择限制结束时间', timeout: 500, icon: 'error' });
                return false;
            } else if (this.projectType == '') {
                this.$dialog.toast({ mes: '请输入项目类别', timeout: 500, icon: 'error' });
                return false;
            } else if (this.mainPerson == '') {
                this.$dialog.toast({ mes: '请选择主办人', timeout: 500, icon: 'error' });
                return false;
            } else if (this.assistPerson == '') {
                this.$dialog.toast({ mes: '请选择协办人', timeout: 500, icon: 'error' });
                return false;
            } else {
                $.post(this.$store.state.link + '/check/add', {
                    token: window.localStorage.getItem("token"),
                    enterpriseId: this.enterpriseId,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    projectType: this.projectType,
                    mainPerson: this.mainPersonId,
                    assistPerson: this.assistPersonId.join(',')
                }, (data) => {
                    if (data.success) {
                        this.$dialog.toast({
                            mes: data.msg,
                            timeout: 500,
                            icon: 'success',
                            callback: () => {
                                this.$router.push('/Supervise/isAdd')
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
        }
    }
}
</script>
