import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutAdmin from '@components/admin/layoutAdmin';
import {
  useOneDepthList,
  useOneDepth,
  useEditOneDepth,
} from '@hooks/useOneDepth';
import { useTwoDepth, useEditTwoDepth } from '@hooks/useTwoDepth';
import { useEditTwoDepthContent } from '@hooks/useTwoDepthContent';
import { Table, Select, Button, Space, Modal, Input, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
const { Option } = Select;
const { Text } = Typography;
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FormOutlined,
} from '@ant-design/icons';

interface DataType {
  id: any;
  content: any;
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

function PageList() {
  const router = useRouter();
  const columns: ColumnsType<DataType> = [
    {
      title: 'two_depth title',
      dataIndex: 'label',
    },
    {
      title: 'content',
      dataIndex: 'content',
      render: (text, record) =>
        record.content.data ? <span>O</span> : <span>X</span>,
    },
    {
      title: 'title edit',
      render: (text, record) => (
        <Space className="editButton">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onOpenChangeTwoDepthModal(record)}
          />
        </Space>
      ),
    },
    {
      title: 'content edit',
      render: (text, record) => (
        <Space className="editButton">
          <Button
            type="primary"
            icon={<FormOutlined />}
            onClick={() => router.push(`/admin/contents/${record.id}/write`)}
          />
        </Space>
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

  const [selectMenu, setSelectMenu] = useState<any>({ title: '', id: '0' });
  const [inputValue, setInputValue] = useState<string>(null);

  const [isShowCreateTwoDepthModal, setIsShowCreateTwoDepthModal] =
    useState<boolean>(false);
  const [isShowChangeTwoDepthModal, setIsShowChangeTwoDepthModal] =
    useState<boolean>(false);
  const [isShowDeleteTwoDepthModal, setIsShowDeleteTwoDepthModal] =
    useState<boolean>(false);

  const [selectOneDepthId, setSelectOneDepthId] = useState('1');
  const { oneDepthListData } = useOneDepthList();
  const { oneDepthData } = useOneDepth(selectOneDepthId);
  const { refreshOneDepth } = useEditOneDepth();
  const { createTwoDepth, changeTwoDepthName, deleteTwoDepth } =
    useEditTwoDepth();
  const { deleteTwoDepthContent } = useEditTwoDepthContent();

  const onOpenCreateTwoDepthModal = () => {
    setIsShowCreateTwoDepthModal(true);
  };

  const onOpenChangeTwoDepthModal = (record) => {
    setSelectMenu(record);
    setIsShowChangeTwoDepthModal(true);
  };

  const onCloseModal = () => {
    isShowChangeTwoDepthModal && setIsShowChangeTwoDepthModal(false);
    isShowCreateTwoDepthModal && setIsShowCreateTwoDepthModal(false);
    isShowDeleteTwoDepthModal && setIsShowDeleteTwoDepthModal(false);
    setInputValue(null);
  };

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onCreateTwoDepth = () => {
    const createTwoDepthData = {
      data: {
        one_depth: localStorage.onOneDepthID,
        two_depth: inputValue,
      },
    };
    createTwoDepth(createTwoDepthData);
    onCloseModal();
  };

  const onChangeTwoDepthName = (record) => {
    const changeOneDepthData = { data: { two_depth: inputValue } };

    changeTwoDepthName({
      id: String(selectMenu.id),
      reqData: changeOneDepthData,
    });
    refreshOneDepth(selectOneDepthId);
    onCloseModal();
  };

  const onChangeSelectOneDepth = (value) => {
    setSelectOneDepthId(value);
    localStorage.setItem('onOneDepthID', value);
  };

  const onOpenDeleteOneDepthModal = (record) => {
    setSelectMenu(record);
    setIsShowDeleteTwoDepthModal(true);
  };

  const onDeleteMenu = () => {
    deleteTwoDepth(String(selectMenu.id));
    if (selectMenu.content.data) {
      deleteTwoDepthContent(selectMenu.content.id);
    }
    onCloseModal();
  };
  useEffect(() => {
    setSelectOneDepthId(localStorage.onOneDepthID || '1');
  }, []);

  return (
    <LayoutAdmin>
      <div>
        <h2>Two Depth Contents</h2>
        <br />
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <Text>One Depth 선택</Text>{' '}
            <Select
              // defaultValue={}
              onChange={onChangeSelectOneDepth}
              value={Number(selectOneDepthId)}
            >
              {oneDepthListData?.map((item) => {
                return (
                  <Option key={item.key} value={item.id}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onOpenCreateTwoDepthModal}
          >
            메뉴 생성
          </Button>
        </Space>
        <br />
        <br />
        <Table
          columns={columns}
          dataSource={oneDepthData?.two_depths}
          size="middle"
        />
      </div>
      <Modal
        title="Menu 생성"
        visible={isShowCreateTwoDepthModal}
        onOk={onCreateTwoDepth}
        onCancel={onCloseModal}
      >
        메뉴 이름
        <Input value={inputValue} onChange={onChangeInput} />
      </Modal>
      <Modal
        title="Menu 이름 변경"
        visible={isShowChangeTwoDepthModal}
        onOk={onChangeTwoDepthName}
        onCancel={onCloseModal}
      >
        {selectMenu.label} {' => '}
        <Input value={inputValue} onChange={onChangeInput} />
      </Modal>
      <Modal
        title="Menu 삭제"
        visible={isShowDeleteTwoDepthModal}
        onOk={onDeleteMenu}
        onCancel={onCloseModal}
      >
        two Depth를 삭제하시겠습니까?
      </Modal>
    </LayoutAdmin>
  );
}
export default PageList;
