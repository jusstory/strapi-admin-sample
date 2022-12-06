import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Layout, Menu } from 'antd';
const { Sider } = Layout;

type siderPropsType = {
  menuList: any;
  selectOneDepth?: string;
  setSelectOneDepth?: (selectOneDepth) => void;
};

function Siders({ menuList, setSelectOneDepth }: siderPropsType) {
  const router = useRouter();
  const [selectMenu, setSelectMenu] = useState<string>('');
  const thisLocation = router.pathname.split('/')[1];

  const onMoveToPage = (e) => {
    setSelectMenu(e.key);
    if (thisLocation === 'admin') {
      router.push(`/${thisLocation}/${e.key}`);
    } else {
      localStorage.setItem('onOneDepthID', e.key.split('one_depth_').pop());
      setSelectOneDepth(e.key.split('one_depth_').pop());
    }
  };

  useEffect(() => {
    if (thisLocation === 'admin') {
      setSelectMenu(router.pathname.split('/').pop());
    } else {
      setSelectMenu('one_depth_1');
    }
  }, [thisLocation]);

  return (
    <Sider width={200} className="site-layout-background">
      {menuList && (
        <Menu
          mode="inline"
          defaultOpenKeys={['one_depth_1']}
          selectedKeys={[selectMenu]}
          items={menuList}
          onClick={onMoveToPage}
          style={{ height: '100%', borderRight: 0 }}
        />
      )}
    </Sider>
  );
}

export default Siders;
