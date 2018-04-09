<style lang="less" scoped>
    .search{
        width: 100%;
        height: 50px;
        background: #eee;
        padding: 10px 0;
       .input-box{
           height: 30px;
           background: #fff;
           border-radius: 5px;
           display: inline-block;
           width: 94%;
           margin-left: 3%;
           &.isHave{
               width: 78%;
           }
           .icon{
               float: left;
               height: 30px;
               width: 30px;
               text-align: center;
               line-height: 30px;
               font-size: 16px;
           }
           input.search-input{
               float: left;
               height: 100%;
               border: none;
               outline: none;
               font-family: '微软雅黑';
           }
           .icon-clear{
               float: right;
               width: 30px;
               text-align: center;
               line-height: 30px;
               font-size: 18px;
               color: #ea4d4d;
           }
       }
       .search-btn{
           display: block;
           float: right;
           height: 30px;
           width: 0;
           line-height: 30px;
           text-align: center;
           margin-right: 3%;
        //    background: #ffa026;
        //    border-radius: 3px;
           color: #ffa026;
           &.isHave{
               width: 14%;
           }
       }
    }
</style>
<style scoped>
    input.search-input{
        width: calc(100% - 60px);
    }
</style>


<template>
    <div class="search">
        <div class="input-box" :class="{'isHave': isSearchBtn}">
            <div class="icon"><i class="ion-ios-search-strong"></i></div>
            <input :value="searchText" class="search-input" @input="changeFun()" ref="input" type="text" :placeholder="placeholder">
            <div class="icon-clear" v-show="isSearchBtn" @click="clearFun"><i class="ion-ios-close"></i></div>
        </div>
        <div class="search-btn" v-show="isSearchBtn" :class="{'isHave': isSearchBtn}" @click="clearFun">取消</div>
    </div>
</template>

<script>
export default {
    props:{
        value:{
            default: '',
            type: String
        },
        placeholder: {
            default: '搜索',
            type: String
        }
    },
    data(){
        return{
            searchText: this.value,
            isSearchBtn: false, // 清空按钮是否显示
        }
    },
    watch:{
        searchText(a){
            if(a){
                this.isSearchBtn = true;
            }else{
                this.isSearchBtn = false;
            };
            this.$emit('input', this.searchText);
        }
    },
    methods:{
        changeFun(){
            let val = this.$refs.input.value
            this.searchText = val;
        },
        clearFun(){
            this.searchText = '';
        }
    }
}
</script>

