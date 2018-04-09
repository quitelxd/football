<style lang="less" scoped>
@keyframes loadingWrapper{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
.wrapper-xl{
    position: relative;
    &::before{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        content: '松开手指刷新列表';
        color: #bbb;
        z-index: 0;
    }
}
    .scroll{
        position: relative;
        >.xl-box{
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #bbb;
            background: #f5f5f5;
            z-index: 1;
            .icon{
                display: inline-block;
                animation: loadingWrapper 1s linear infinite;
            }
        }
        .refash-box{
            position: fixed;
            width: 36px;
            height: 36px;
            right: 30px;
            bottom: 80px;

            background: #ff3131;
            border-radius: 100%;
            color: #fff;
            text-align: center;
            line-height: 36px;
            font-size: 24px;
            box-shadow: 0 0 5px rgba(0,0,0,.4);

            &.refashIng{
                animation: loadingWrapper .5s linear infinite;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .4s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
</style>

<template>
    <div class="scroll" ref="wrapper" :class="{'wrapper-xl': pulldown}">
        <div class="xl-box" v-if="xlShow"><div class="icon"><i class="ion-load-c"></i></div> 加载中，请稍后</div>
        <slot></slot>
        <div v-if="pulldown" class="refash-box" :class="{'refashIng': xlShow}" @click="refashIngFun">
            <i class="ion-android-refresh"></i>
        </div> 
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    components:{
        BScroll
    },
    data(){
        return {
            
        }
    },
    props: {
        /**
         * 1 滚动的时候会派发scroll事件，会截流。
         * 2 滚动的时候实时派发scroll事件，不会截流。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        xlShow:{
            type: Boolean,
            default: false
        },
        probeType: {
            type: Number,
            default: 2
        },
        /**
         * 点击列表是否派发click事件
         */
        click: {
            type: Boolean,
            default: true
        },
        /**
         * 是否开启横向滚动
         */
        scrollX: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发滚动事件
         */
        listenScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 列表的数据
         */
        data: {
            // type: Array,
            // default: null
        },
        /**
         * 是否派发滚动到底部的事件，用于上拉加载
         */
        pullup: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发顶部下拉的事件，用于下拉刷新
         */
        pulldown: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发列表滚动开始的事件
         */
        beforeScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 当数据更新后，刷新scroll的延时。
         */
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll();
        // this.goTop();
      }, 20)
    },
    methods:{
        //初始化
        _initScroll(){
            if (!this.$refs.wrapper) {
                return
            }

            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX,
                // pullDownRefresh: true,
                scrollbar: true
            })

            // 是否派发滚动事件
            if (this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos)
                })
            }

            // 是否派发滚动到底部事件，用于上拉加载
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    // 滚动到底部
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        this.$emit('scrollToEnd')
                    }
                })
            }
            // 是否派发顶部下拉事件，用于下拉刷新
            if (this.pulldown) {
                this.scroll.on('touchEnd', (pos) => {
                    if(this.xlShow){
                        return false;
                    }
                    if (pos.y > 50) {
                        this.$emit('pulldown')
                    }
                })
            }

            // 是否派发列表滚动开始的事件
            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll')
                })
            }

            let parentVm = $(this.$parent.$el);
            let cfBlur = false;
            if(parentVm.find('input').length>0 || parentVm.find('textarea').length>0){
                cfBlur = true;
            };
            this.scroll.on('scroll', (pos) => {
                if(cfBlur){
                    parentVm.find('input').blur();
                    parentVm.find('textarea').blur();
                };
            })
        },

        // 代理better-scroll的disable方法
        disable() {
            this.scroll && this.scroll.disable()
        },

        // 代理better-scroll的enable方法
        enable() {
            this.scroll && this.scroll.enable()
        },

        // 代理better-scroll的refresh方法
        refresh() {
            this.scroll && this.scroll.refresh()
        },

        // 代理better-scroll的scrollTo方法
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },

        // 代理better-scroll的scrollToElement方法
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        },
        refashIngFun(){
            this.scroll.scrollTo(0,0);
            this.$emit('pulldown');
        }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh();
        }, this.refreshDelay)
      }
    }
}
</script>

