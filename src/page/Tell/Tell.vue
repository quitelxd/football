<style lang="less" scoped>
.tell {
    width: 100%;
    height: 100%;
    position: relative;
    .search-box {
        width: 100%;
        height: 50px;
    }
}
</style>
<style>
.tell-list {
    width: 100%;
    height: calc(100% - 50px);
}

.mint-cell-value {
    font-size: 14px;
}

.tell-list>ul {
    max-height: 100% !important;
}
</style>


<template>
    <div class="tell">
        <Search v-model="search" class="search-box" placeholder="查找"></Search>
        <mt-index-list class="tell-list" v-if="searchData.length>0">
            <mt-index-section :index="item.name.toUpperCase()" v-for="(item, index) in searchData" :key="index" v-if="item.items.length>0">
                <mt-cell :title="item2.name+'（'+item2.orgName+'）'" :value='item2.phone' v-for="(item2, index2) in item.items" :key="index2" @click.native="actionsheetFun(item2.phone)"></mt-cell>
            </mt-index-section>
        </mt-index-list>
        <div class="nullData" v-else></div>
        <yd-actionsheet :items="myItems" v-model="actionsheetShow" cancel="取消"></yd-actionsheet>
    </div>
</template>
<script>
import { IndexList, IndexSection, Cell } from 'mint-ui';
import 'mint-ui/lib/index-list/style.css'
import 'mint-ui/lib/cell/style.css'
import 'mint-ui/lib/index-section/style.css'

import Search from '../../components/Search'
export default {
    components: {
        'mt-index-list': IndexList,
        'mt-index-section': IndexSection,
        'mt-cell': Cell,
        Search
    },
    data() {
        return {
            tellData: [], //通讯录数据

            // 点击弹出操作按钮
            actionsheetShow: false,
            tellNow: '',    // 当前点击电话
            myItems: [
                {
                    label: '拨打电话',
                    callback: () => {
                        window.location.href = "tel:" + this.tellNow;
                    }
                },
                {
                    label: '发送短信',
                    callback: () => {
                        window.location.href = "sms:" + this.tellNow;
                    }
                }
            ],
            search: ''
        }
    },
    created() {
        // 请求数据
        this.dataFun();
    },
    computed: {
        searchData() {
            let search = this.search;
            let data = [];
            for (let i = 0; i < this.tellData.length; i++) {
                if (search == this.tellData[i].nameJ || this.tellData[i].name.indexOf(search) >= 0 || this.tellData[i].phone.indexOf(search) >= 0) {
                    data.push(this.tellData[i])
                }
            };
            let ywzm = [
                { items: [], name: 'a' }, { items: [], name: 'b' }, { items: [], name: 'c' },
                { items: [], name: 'd' }, { items: [], name: 'e' }, { items: [], name: 'f' },
                { items: [], name: 'g' }, { items: [], name: 'h' }, { items: [], name: 'i' },
                { items: [], name: 'j' }, { items: [], name: 'k' }, { items: [], name: 'l' },
                { items: [], name: 'm' }, { items: [], name: 'n' }, { items: [], name: 'o' },
                { items: [], name: 'p' }, { items: [], name: 'q' }, { items: [], name: 'r' },
                { items: [], name: 's' }, { items: [], name: 't' }, { items: [], name: 'u' },
                { items: [], name: 'v' }, { items: [], name: 'w' }, { items: [], name: 'x' },
                { items: [], name: 'y' }, { items: [], name: 'z' }
            ];
            for (let i = 0; i < ywzm.length; i++) {
                for (let s = 0; s < data.length; s++) {
                    if (data[s].nameJ == ywzm[i].name) {
                        ywzm[i].items.push(data[s]);
                    }
                }
            };
            return ywzm;
        }
    },
    watch: {
        actionsheetShow(a) {
            if (!a) {
                this.tellNow = false;
            }
        }
    },
    methods: {
        // 点击列表操作
        actionsheetFun(tell) {
            this.tellNow = tell;
            this.actionsheetShow = true;
        },
        dataFun() {
            $.post(this.$store.state.link + '/address/listData', {
                token: window.localStorage.getItem("token"),
                dataType: 'filter'
            }, (data) => {
                if (data.success) {
                    let tellData = [];
                    for (let i = 0; i < data.data.length; i++) {
                        if (data.data[i].items.length > 0) {
                            for (let s = 0; s < data.data[i].items.length; s++) {
                                tellData.push(
                                    {
                                        id: data.data[i].items[s].id,
                                        name: data.data[i].items[s].name,
                                        orgName: data.data[i].items[s].orgName,
                                        phone: data.data[i].items[s].phone,
                                        phonetic: data.data[i].items[s].phonetic,
                                        sex: data.data[i].items[s].sex,
                                        wechat: data.data[i].items[s].wechat,
                                        nameJ: data.data[i].name
                                    }
                                )
                            }
                        }
                    };
                    this.tellData = tellData;
                } else {
                    if (data.errorCode == 400) {
                        this.$emit('login')
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
                }
            })
        }
    }
}
</script>
