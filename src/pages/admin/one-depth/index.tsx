import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
import LayoutAdmin from '@components/admin/layoutAdmin';
// import { useMenusQuery } from '@api/menus';
import { useOneDepthList, useEditOneDepth } from '@hooks/useOneDepth';
import { Button, Space, Table, Modal, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  label: string;
  two_depths: string;
}

function PageList() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'title',
      dataIndex: 'label',
    },
    {
      title: 'two depth',
      dataIndex: 'two_depths',
      render: (text, record) => <Space>{record.two_depths.length}</Space>,
    },
    {
      title: 'edit',
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => onOpenChangeOneDepthModal(record)}
        />
      ),
    },
    {
      title: 'delete',
      render: (text, record) => (
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => onOpenDeleteOneDepthModal(record)}
          danger
        />
      ),
    },
  ];
  const [isShowCreateOneDepthModal, setIsShowCreateOneDepthModal] =
    useState<boolean>(false);
  const [isShowChangeOneDepthModal, setIsShowChangeOneDepthModal] =
    useState<boolean>(false);
  const [isShowDeleteOneDepthModal, setIsShowDeleteOneDepthModal] =
    useState<boolean>(false);
  const [selectMenu, setSelectMenu] = useState<any>({ title: '', id: '0' });
  const [inputValue, setInputValue] = useState<string>(null);

  const { oneDepthListData } = useOneDepthList();
  const { createOneDepth, changeOneDepthName, deleteOneDepth } =
    useEditOneDepth();

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onOpenCreateOneDepthModal = () => {
    setIsShowCreateOneDepthModal(true);
  };
  const onCreateOneDepth = () => {
    const createOneDepthData = { data: { one_depth: inputValue } };
    createOneDepth(createOneDepthData);
    onCloseModal();
  };

  const onOpenChangeOneDepthModal = (record) => {
    setSelectMenu(record);
    setIsShowChangeOneDepthModal(true);
  };

  const onChangeOneDepthName = (record) => {
    const changeOneDepthData = { data: { one_depth: inputValue } };

    changeOneDepthName({
      id: String(selectMenu.id),
      reqData: changeOneDepthData,
    });
    onCloseModal();
  };

  const onOpenDeleteOneDepthModal = (record) => {
    setSelectMenu(record);
    setIsShowDeleteOneDepthModal(true);
  };

  const onDeleteMenu = () => {
    deleteOneDepth(String(selectMenu.id));
    onCloseModal();
  };

  const onCloseModal = () => {
    isShowChangeOneDepthModal && setIsShowChangeOneDepthModal(false);
    isShowCreateOneDepthModal && setIsShowCreateOneDepthModal(false);
    isShowDeleteOneDepthModal && setIsShowDeleteOneDepthModal(false);
    setInputValue(null);
  };

  return (
    <LayoutAdmin>
      <div>
        <h2>One Depth</h2>
        <br />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onOpenCreateOneDepthModal}
        >
          메뉴 생성
        </Button>
        <br />
        <br />
        <Table columns={columns} dataSource={oneDepthListData} />
      </div>
      <Modal
        title="Menu 생성"
        visible={isShowCreateOneDepthModal}
        onOk={onCreateOneDepth}
        onCancel={onCloseModal}
      >
        메뉴 이름
        <Input value={inputValue} onChange={onChangeInput} />
      </Modal>
      <Modal
        title="Menu 이름 변경"
        visible={isShowChangeOneDepthModal}
        onOk={onChangeOneDepthName}
        onCancel={onCloseModal}
      >
        {selectMenu.label} {' => '}
        <Input value={inputValue} onChange={onChangeInput} />
      </Modal>
      <Modal
        title="Menu 삭제"
        visible={isShowDeleteOneDepthModal}
        onOk={onDeleteMenu}
        onCancel={onCloseModal}
      >
        One Depth를 삭제하시겠습니까?
      </Modal>
    </LayoutAdmin>
  );
}
export default PageList;
