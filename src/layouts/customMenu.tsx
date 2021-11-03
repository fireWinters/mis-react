/*
 * @Author 舜君
 * @LastEditTime 2021-11-03 17:37:40
 * @Description
 */
export default [
  {
    path: '/',
    name: 'welcome',
    children: [
      {
        path: '/change',
        name: 'two',
        children: [
          {
            path: '/permissionChange',
            name: 'one',
            exact: true,
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
