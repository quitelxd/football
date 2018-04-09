import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/Home/Work'
    },
    {
      path: '/Login', // 登录页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Login.vue'], res)
    },
    {
      path: '/Register', // 登录页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Register.vue'], res)
    },
    {
      path: '/Home', // 首页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Home.vue'], res),
      children: [{
          path: '/Home/Task', // 任务页
          meta: {
            keepAlive: false
          },
          component: (res) => require(['../page/Task/Task.vue'], res)
        },
        {
          path: '/Home/Work', // 工作页
          meta: {
            keepAlive: false
          },
          component: (res) => require(['../page/Work/Work.vue'], res)
        },
        {
          path: '/Home/News', // 新闻页
          meta: {
            keepAlive: true
          },
          component: (res) => require(['../page/News/News.vue'], res)
        },
        {
          path: '/Home/UnitInfo', // 单位信息页
          meta: {
            keepAlive: false
          },
          component: (res) => require(['../page/UnitInfo/UnitInfo.vue'], res)
        },
        {
          path: '/Home/Tell', // 通讯录
          meta: {
            keepAlive: true
          },
          component: (res) => require(['../page/Tell/Tell.vue'], res)
        },
        {
          path: '/Home/Me', // 我的
          meta: {
            keepAlive: false
          },
          component: (res) => require(['../page/Me/Me.vue'], res)
        },
      ]
    },
    {
      path: '/Fire', // 火灾信息页
      meta: {
        keepAlive: true
      },
      component: (res) => require(['../page/Fire/Fire.vue'], res)
    },
    {
      path: '/UnitInfo', // 单位信息页
      meta: {
        keepAlive: true
      },
      component: (res) => require(['../page/UnitInfo/UnitInfo.vue'], res)
    },
    {
      path: '/UnitInfoContent/:id', // 单位信息详情页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/UnitInfo/UnitInfoContent.vue'], res)
    },
    {
      path: '/AddSupervise', // 监督检查新增页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Supervise/AddSupervise.vue'], res)
    },
    {
      path: '/Supervise', // 监督检查页
      meta: {
        keepAlive: true
      },
      component: (res) => require(['../page/Supervise/Supervise.vue'], res)
    },
    {
      path: '/Supervise/:isAdd', // 监督检查新增页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Supervise/Supervise.vue'], res)
    },
    {
      path: '/SuperviseInfo/:id', // 监督检查详情页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Supervise/SuperviseInfo.vue'], res)
    },
    {
      path: '/reportProblem', // 隐患上报页
      meta: {
        keepAlive: true
      },
      component: (res) => require(['../page/Danger/ReportProblem.vue'], res)
    },
    {
      path: '/reportProblem/:isAdd', // 隐患上报页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Danger/ReportProblem.vue'], res)
    },
    {
      path: '/Danger', // 隐患信息页
      meta: {
        keepAlive: true
      },
      component: (res) => require(['../page/Danger/Danger.vue'], res)
    },
    {
      path: '/Danger/:isAdd', // 隐患信息页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Danger/Danger.vue'], res)
    },
    {
      path: '/DangerAdd/:from', // 隐患信息新增页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Danger/DangerAdd.vue'], res)
    },
    {
      path: '/DangerInfo/:id', // 隐患信息详情页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Danger/DangerInfo.vue'], res)
    },
    {
      path: '/Acceptance', // 单位验收页
      meta: {
        keepAlive: true
      },
      component: (res) => require(['../page/Acceptance/Acceptance.vue'], res)
    },
    {
      path: '/TaskInfo/:id/:type/:over', // 任务详情页
      name: 'TaskInfo',
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Task/TaskInfo.vue'], res)
    },
    {
      path: '/ProblemCheck', // 处理任务
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/Task/ProblemCheck.vue'], res)
    },
    {
      path: '/NewsInfo/:id', // 新闻详情页
      meta: {
        keepAlive: false
      },
      component: (res) => require(['../page/News/NewsInfo.vue'], res)
    }
  ]
})
