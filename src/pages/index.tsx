import React, { useEffect, useState } from 'react';
import Sider from '@components/common/sider';
import FaqContent from '@components/faq/contents';
import { useOneDepthList } from '@hooks/useOneDepth';

import { Layout } from 'antd';

export default function Home() {
  const { oneDepthListData } = useOneDepthList();
  const [selectOneDepth, setSelectOneDepth] = useState('1');

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        menuList={oneDepthListData}
        selectOneDepth={selectOneDepth}
        setSelectOneDepth={setSelectOneDepth}
      />
      <Layout style={{ padding: '0 24px 24px' }}>
        <FaqContent selectOneDepth={selectOneDepth} />
      </Layout>
    </Layout>
  );
}
