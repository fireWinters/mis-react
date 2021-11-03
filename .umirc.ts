/*
 * @Author 舜君
 * @LastEditTime 2021-11-03 17:45:53
 * @Description
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {
  //   /** Theme for nav menu */
  //   navTheme: 'dark',
  //   /** Primary color of ant design */
  //   // primaryColor: "#fefece",
  //   /** Nav menu position: `side` or `top` */
  //   layout: 'mix',
  //   /** Layout of content: `Fluid` or `Fixed`, only works when layout is top */
  //   contentWidth: 'Fixed',
  //   /** Sticky header */
  //   fixedHeader: true,
  //   /** Sticky siderbar */
  //   fixSiderbar: true,
  //   menu: { locale: false },
  //   title: 'MIS',
  //   pwa: true,
  //   splitMenus: true,
  // },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   {
  //     path: '/manage/change/permissionChange',
  //     component: '@/pages/manage/change/permissionChange',
  //   },
  //   {
  //     path: '/manage/change/assetChange',
  //     component: '@/pages/manage/change/assetChange',
  //   },
  //   {
  //     path: '/manage/change/assetStockChange',
  //     component: '@/pages/manage/change/assetStockChange',
  //   },
  //   {
  //     path: '/manage/change/supplementaryAgreement',
  //     component: '@/pages/manage/change/supplementaryAgreement',
  //   }
  // ],
  fastRefresh: {},
});
