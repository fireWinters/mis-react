/*
 * @Author 舜君
 * @LastEditTime 2021-11-03 17:44:58
 * @Description
 */
import React, { useRef } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import customMenuDate from './customMenu';
import useProLayoutMenu from './hooks/useProLayoutMenu';
import { Link } from 'react-router-dom';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = (props: BaseLayoutProps) => {
  const actionRef = useRef<{
    reload: () => void;
  }>();

  const [menu] = useProLayoutMenu(async () => {
    await waitTime(2000);
    return customMenuDate;
  });

  const { children } = props;

  return (
    <ProLayout
      title="MIS"
      layout="mix"
      navTheme="light"
      splitMenus={true}
      style={{ minHeight: '100vh' }}
      menu={menu}
      menuItemRender={(item, defaultDom) => {
        const { isUrl, path } = item;
        if (!isUrl && path) {
          return <Link to={path}> {defaultDom}</Link>;
        }
        return defaultDom;
      }}
    >
      {children}
    </ProLayout>
  );
};

export default BaseLayout;
