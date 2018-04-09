<style lang="less" scoped>
.home {
    padding-bottom: 54px;
    .view2 {
        width: 100%;
        height: 100%;
    }
    .yd-tabbar-active {
        color: #ff3131 !important; // color: #ff8e15 !important;
    }
}
</style>

<template>
    <div class="home pages">
        <keep-alive>
            <router-view class="view2" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view class="view2" v-if="!$route.meta.keepAlive" />

        <yd-navbar :title="$store.state.homeNavTitle" class="head-nav">

        </yd-navbar>

        <yd-tabbar class="foot-tabbar">
            <!--<yd-tabbar-item v-for="(item,index) in navbarData" :key="index" v-if="!item.hide" :title="item.name" :link="item.link" :active="index == $store.state.homeNavActive" @click.native="tabbarClick(index)" :dot="item.isDot">
                        <i :class="item.icon" slot="icon"></i>
                    </yd-tabbar-item>-->
            <yd-tabbar-item title="比赛推荐" link="/Home/Work" :active="$store.state.homeNavActive == 0" @click.native="tabbarClick(0)" :dot="$store.state.isDot1">
                <i class="ion-ios-home-outline" slot="icon"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="历史赛事" link="/Home/Task" :active="$store.state.homeNavActive == 1" @click.native="tabbarClick(1)">
                <i class="ion-clipboard" slot="icon"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="热门推荐" link="/Home/UnitInfo" :active="$store.state.homeNavActive == 2" @click.native="tabbarClick(2)" :dot="$store.state.isDot">
                <i class="ion-android-globe" slot="icon"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="/Home/Me" :active="$store.state.homeNavActive == 3" @click.native="tabbarClick(3)">
                <i class="ion-ios-person" slot="icon"></i>
            </yd-tabbar-item>
        </yd-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navbarData: []
        }
    },
    watch: {

    },
    created() {
        // 请求操作
        this.navbarData = [
            { name: '比赛推荐', link: '/Home/Work', icon: 'ion-ios-home-outline', isDot: this.$store.state.isDot1 },
            { name: '历史赛事', link: '/Home/Task', icon: 'ion-clipboard', isDot: false },
            { name: '热门推荐', link: '/Home/UnitInfo', icon: 'ion-android-globe', isDot: this.$store.state.isDot },
            // { name: '通讯录', link: '/Home/Tell', icon: 'ion-ios-telephone', isDot: false, hide: this.navbarDataShow(window.localStorage.getItem("userType")) },
            { name: '我的', link: '/Home/Me', icon: 'ion-ios-person', isDot: false }
        ];
        // 为首页当前点击页和首页顶部标题赋值
        if (!this.$store.state.homeNavTitle) {
            for (var i = 0; i < this.navbarData.length; i++) {
                if (this.$route.path == this.navbarData[i].link) {
                    this.$store.state.homeNavTitle = this.navbarData[i].name;
                    this.$store.state.homeNavActive = i;
                }
            }
        }
    },
    mounted() {

    },
    methods: {
        navbarDataShow(a) {
            if (a == 'assist') {
                return true
            } else if (a == 'police') {
                return false
            }
        },
        tabbarClick(index) {
            this.$store.state.homeNavActive = index; // 首页当前点击页
            let name = this.navbarData[index].name;
            this.$store.state.homeNavTitle = name; // 首页顶部标题
        }
    }
}
</script>