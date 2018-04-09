<style lang="less" scoped>
.ProblemCheck {
    .wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .content {
            .page {
                padding-top: 10px;
            }
        }
    }
}
</style>
<template>
    <div class="ProblemCheck pages">
        <yd-navbar title="隐患处理" class="head-nav">
            <div slot="left" @click="$router.back()">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
        </yd-navbar>
        <Scroll class="wrapper" :data="data">
            <div class="content">
                <div class="page">
                    <yd-cell-group>
                        <yd-cell-item>
                            <yd-radio-group v-model="radio2" slot="left">
                                <yd-radio val="1">受理隐患</yd-radio>
                                <yd-radio val="2">误报</yd-radio>
                            </yd-radio-group>
                        </yd-cell-item>
                    </yd-cell-group>
                    <yd-cell-group>
                        <yd-cell-item>
                            <yd-textarea slot="right" placeholder="请输入您的处理意见" maxlength="100"></yd-textarea>
                        </yd-cell-item>
                    </yd-cell-group>
                    <yd-button size="large" type="primary">提交</yd-button>
                </div>
            </div>
        </Scroll>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio2: '',
            data: []
        }
    }
}
</script>

