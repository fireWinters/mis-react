export default [
  {
    path: '/',
    name: 'welcome',
  },
  {
    path: '/demo',
    name: 'demo',
  },
  {
    path: '/manage',
    name: 'ProductManagement',
    children: [
      {
        path: '/change',
        name: 'two',
        children: [
          {
            path: '/permissionChange',
            name: 'one',
            exact: true,
            component: '@/pages/manage/change/assetChange',
          },
          {
            path: 'supplementaryAgreement',
            name: 'two',
            exact: true,
          },
          {
            path: 'assetChange',
            name: 'two',
            exact: true,
          },
        ],
      },
    ],
  },
];
