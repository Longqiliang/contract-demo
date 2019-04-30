import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

function propIdFn(route) {
  return {
    id: route.query.id
  }
}

const routes = [{
    path: '/',
    name: 'index',
    redirect: '/contract',
    hidden: true
  },
  {
    path: '/contract',
    name: 'contract',
    redirect: 'contract/list',
    meta: {
      title: '合同列表',
      icon: 'contract'
    },
    component: () =>
      import('@/components/DefaultView'),
    children: [{
        path: 'list',
        name: 'contractList',
        meta: {
          title: '合同列表',
          icon: 'contract'
        },
        component: () =>
          import('@/views/contract/list'),
      }, {
        path: 'add',
        name: 'contractAdd',
        component: () =>
          import('@/views/contract/add'),
      },
      {
        path: 'edit',
        name: 'contractEdit',
        component: () =>
          import('@/views/contract/edit'),
      },
      {
        path: 'detail',
        name: 'contractDetail',
        component: () =>
          import('@/views/contract/detail'),
      }
    ]
  },
  {
    path: '/payment',
    name: 'payment',
    redirect: '/payment/index',
    meta: {
      title: '支付明细',
      icon: 'payment'
    },
    component: () =>
      import('@/components/DefaultView'),
    children: [{
      path: 'index',
      name: 'paymentIndex',
      meta: {
        title: '支付明细',
        icon: 'payment'
      },
      component: () =>
        import('@/views/payment/index')
    }, {
      path: 'detail',
      name: 'paymentDetail',
      meta: {
        title: '支付详情'
      },
      props: propIdFn,
      component: () =>
        import('@/views/payment/detail')
    }]
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      title: '统计分析',
      icon: 'statistics'
    },
    component: () => import('@/views/statistics/index')
  },
  {
    path: '/export',
    name: 'export',
    meta: {
      title: '数据导出',
      icon: 'export'
    },
    component: () => import('@/views/export/index')
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export {
  router
}