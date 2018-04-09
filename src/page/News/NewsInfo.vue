<style lang="less" scoped>
.newsInfo {
  background: #fff;
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
  }
  .content {
    padding: 15px;
    width: 100%;
    overflow: hidden;
    .title {
      font-size: 2.2rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 10px;
    }
    .time {
      color: #999;
      div {
        float: left;
        width: 50%;
        text-align: center;
      }
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }
    .timer {
      color: #999;
      text-align: right;
    }
  }
}
</style>
<template>
  <div class="newsInfo pages">
    <yd-navbar title="新闻详情" class="head-nav">
      <div slot="left" @click="$router.back()">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </div>
    </yd-navbar>

    <Scroll class="wrapper" :data="newsData">
      <div class="content">
        <div class="title">
          {{newsData.title}}
        </div>
        <div class="time">
          <!--<div>
              新闻类型: 
              <span v-if="newsData.type == 'CMS_1'">通知通报</span>
              <span v-if="newsData.type == 'CMS_2'">新闻公告</span>
              <span v-if="newsData.type == 'CMS_3'">消防安全宣传</span>
              <span v-if="newsData.type == 'CMS_4'">消防动态</span>
              <span v-if="newsData.type == 'CMS_5'">法律法规</span>
            </div>-->
          <div>
            发布人: {{newsData.cpersonName}}
          </div>
          <div>
            发布日期: {{newsData.cdate | subTimeDay}}
          </div>
        </div>
        <div style="padding: 15px 0;text-indent:24px;" v-html="newsData.content"></div>
      </div>
    </Scroll>

  </div>
</template>
<script>
export default {
  data() {
    return {
      newsData: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      $.post(this.$store.state.link + '/announcement/data', {
        id: this.$route.params.id
      }, (data) => {
        if (data.success) {
          this.newsData = data.data;
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
    })
  }
}
</script>
