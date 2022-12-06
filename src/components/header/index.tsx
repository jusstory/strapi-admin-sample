import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

function Headers(props) {
  const router = useRouter();
  const [selectMenu, setSelectMenu] = useState<string>('');
  const items1 = [
    {
      key: 'faq',
      label: 'faq',
    },
    {
      key: 'admin',
      label: 'admin',
    },
  ];

  const onMoveToPage = (e) => {
    switch (e.key) {
      case 'faq':
        router.push('/');
        break;
      case 'admin':
        router.push(`${e.key}/one-depth`);
        break;
      default:
        router.push(e.key);
        break;
    }
  };

  useEffect(() => {
    const thisLocation = router.pathname.split('/')[1];
    setSelectMenu(thisLocation === '' ? 'faq' : thisLocation);
  }, [router]);

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectMenu]}
        selectedKeys={[selectMenu]}
        items={items1}
        onClick={onMoveToPage}
      />
    </Header>
  );
}
export default Headers;
