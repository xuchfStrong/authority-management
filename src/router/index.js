import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () =>
                import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
            import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
            import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
            import('@/views/errorPage/401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () =>
                import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
  }]
},
{
  path: '/documentation',
  component: Layout,
  redirect: '/documentation/index',
  meta: { title: 'documentation' },
  hidden: true,
  children: [{
    path: 'index',
    component: () =>
                import('@/views/documentation/index'),
    name: 'Documentation',
    meta: { title: 'documentation', icon: 'documentation', affix: true }
  }]
},
{
  path: '/guide',
  component: Layout,
  redirect: '/guide/index',
  meta: { title: 'guide' },
  hidden: true,
  children: [{
    path: 'index',
    component: () =>
                import('@/views/guide/index'),
    name: 'Guide',
    meta: { title: 'guide', icon: 'guide', noCache: true }
  }]
}
]

export default new Router({
  // mode: 'history', // 需要后台服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/permission',
    component: Layout,
    id: 1,
    parentId: 0,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    hidden: false,
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: '/permission/page',
      component: () =>
                    import('@/views/permission/page'),
      id: 11,
      parentId: 1,
      name: 'PagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: '/permission/directive',
      component: () =>
                    import('@/views/permission/directive'),
      id: 12,
      parentId: 1,
      name: 'DirectivePermission',
      meta: {
        title: 'directivePermission'
        // if do not set roles, means: this page does not require permission
      }
    },
    {
      path: '/permission/role',
      component: () =>
                    import('@/views/permission/role'),
      id: 13,
      parentId: 1,
      name: 'RolePermission',
      meta: {
        title: 'rolePermission',
        roles: ['admin']
      }
    }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    id: 2,
    parentId: 0,
    redirect: '/icon/index',
    meta: { title: 'icon' },
    children: [{
      path: '/icon/index',
      component: () =>
                import('@/views/svg-icons/index'),
      id: 21,
      parentId: 2,
      name: 'Icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/system',
    component: Layout,
    id: 6,
    parentId: 0,
    redirect: '/system/service',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'example'
    },
    children: [{
      path: '/system/service',
      component: () =>
                    import('@/views/system-management/service'),
      id: 61,
      parentId: 6,
      name: 'SystemService',
      meta: { title: '服务管理', icon: 'edit' }
    },
    {
      path: '/system/role',
      component: () => import('@/views/system-management/role'),
      id: 62,
      parentId: 6,
      name: 'SystemRole',
      meta: { title: '角色管理', icon: 'list' },
      hidden: false
    },
    {
      path: '/system/account',
      component: () => import('@/views/system-management/account'),
      id: 63,
      parentId: 6,
      name: 'SystemUser',
      meta: { title: '用户管理', icon: 'list' }
    }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    name: 'Tab1',
    meta: { title: 'tab1', icon: 'tab' },
    children: [{
      path: '/tab/index',
      component: () =>
                    import('@/views/tab/index'),
      name: 'Tab',
      meta: { title: 'tab', icon: 'tab' }
    },
    {
      path: '/tab/interface',
      component: () => import('@/views/tab/interface/index'),
      name: 'interface',
      meta: { title: 'Interface', icon: 'tab' }
    },
    {
      path: '/tab/tabtest',
      component: () =>
                    import('@/views/tab/tabtest'),
      name: 'Tabtest',
      meta: { title: 'tabtest', icon: 'tab' }
    },
    {
      path: '/tab/tabtest1',
      component: () =>
                    import('@/views/tab/tabtest1'),
      name: 'Tabtest1',
      meta: { title: 'tabtest1', icon: 'tab' }
    },
    {
      path: '/tab/showMore',
      component: () =>
                    import('@/views/tab/showMoreTest'),
      name: 'ShowMore',
      meta: { title: 'showMore', icon: 'tab' }
    },
    {
      path: '/tab/hideTable',
      component: () =>
                    import('@/views/tab/hideTable'),
      name: 'HideTable',
      meta: { title: 'hideTable', icon: 'tab' }
    },
    {
      path: '/tab/tree',
      component: () =>
                    import('@/views/tab/tree'),
      name: 'JsonTree',
      meta: { title: 'Tree', icon: 'tab' }
    }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  componentsRouter,
  chartsRouter,
  nestedRouter,

  /*
  {
    path: '/example',
    component: Layout,
    id: 3,
    parentId: 0,
    redirect: '/example/list',
    name: 'Article',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/create',
        component: () => import('@/views/example/create'),
        id: 31,
        parentId: 3,
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: '/example/edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        id: 32,
        parentId: 3,
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: '/example/list',
        component: () => import('@/views/example/list'),
        id: 33,
        parentId: 3,
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },
*/
  { path: '*', redirect: '/404', hidden: true }
]
