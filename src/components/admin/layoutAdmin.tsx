import React from 'react';
import Sider from '@components/common/sider';

import { Layout } from 'antd';
const { Content } = Layout;

type adminPropsType = {
  children: React.ReactNode;
};

function LayoutAdmin({ children }: adminPropsType) {
  const menuList = [
    {
      key: 'one-depth',
      label: 'one-depth',
    },
    {
      key: 'contents',
      label: 'contents',
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider menuList={menuList} />
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
export default LayoutAdmin;
