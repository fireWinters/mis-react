/*
 * @Author 舜君
 * @LastEditTime 2021-11-03 17:32:43
 * @Description 获取菜单并创建 prolayout 的 menu 配置
 */

import { useState } from 'react';
import type { MenuDataItem, ProSettings } from '@ant-design/pro-layout';

function useProLayoutMenu(
  request: () => Promise<MenuDataItem[]>,
  _params?: Record<string, any>,
  otherSettings?: ProSettings['menu'],
): [ProSettings['menu'], () => void] {
  const [isloading, setLoading] = useState(false);

  const [params, setParams] = useState(_params);

  const menu: ProSettings['menu'] = {
    params,
    loading: isloading,
    request: async () => {
      setLoading(true);
      const res = (await request()).map((item) => ({
        ...item,
      }));

      setLoading(false);
      return res;
    },
    ...otherSettings,
  };

  const reload = () => {
    setParams({ ...params });
  };

  return [menu, reload];
}

export default useProLayoutMenu;
