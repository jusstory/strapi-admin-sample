import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LayoutAdmin from '@components/admin/layoutAdmin';
import { useTwoDepth, useEditTwoDepth } from '@hooks/useTwoDepth';
import { useEditTwoDepthContent } from '@hooks/useTwoDepthContent';
import { Button, Form, Input, Space } from 'antd';
const { TextArea } = Input;

function ContentWrite() {
  const router = useRouter();
  const { twoDepthId } = router.query;
  // const [changeTwoDepthTitle, setChangeTwoDepthTitle] = useState(null);
  const [newTwoDepthContents, setNewTwoDepthContents] = useState(null);
  // const { changeTwoDepthName, deleteTwoDepth } = useEditTwoDepth();

  const { TwoDepthData } = useTwoDepth(String(twoDepthId));
  const { createTwoDepthContent, changeTwoDepthContent } =
    useEditTwoDepthContent(String(twoDepthId));

  const onValuesChange = (changedValues) => {
    const changedKey = Object.keys(changedValues)[0];
    const changedValue = Object.values(changedValues)[0];
    if (changedKey === 'title') {
      // setChangeTwoDepthTitle(changedValue);
    } else if (changedKey === 'content') {
      setNewTwoDepthContents(String(changedValue));
    }
  };

  const onChangeTwoDepth = () => {
    if (!TwoDepthData.content.id) {
      createTwoDepthContent({
        data: { content: newTwoDepthContents, two_depth: TwoDepthData.id },
      });
    } else {
      if (newTwoDepthContents) {
        changeTwoDepthContent({
          id: TwoDepthData.content.id,
          reqData: {
            data: { content: newTwoDepthContents, two_depth: TwoDepthData.id },
          },
        });
      }
    }
    onMoveToList();
  };

  const onMoveToList = () => {
    router.push('/admin/contents');
  };
  const onFinish = (values: any) => {
    onChangeTwoDepth();
  };

  return (
    <LayoutAdmin>
      <div>
        <h2>Two Depth contents 생성</h2>
        <br />
        <br />
        {TwoDepthData && (
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            onValuesChange={onValuesChange}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              title: TwoDepthData.two_depth,
              content: TwoDepthData.content.content,
            }}
          >
            <Form.Item
              label="title"
              name="title"
              rules={[{ required: true, message: '제목을 입력해주세요.' }]}
            >
              <Input
                placeholder="제목을 입력해주세요"
                allowClear
                name="title"
                maxLength={150}
                disabled
              />
            </Form.Item>

            <Form.Item
              label="content"
              name="content"
              rules={[{ required: true, message: '내용을 입력하세요.' }]}
            >
              <TextArea
                name="content"
                placeholder={''}
                style={{ height: '300px' }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
              <Space style={{}}>
                <Button onClick={onMoveToList}>목록으로</Button>
                <Button type="primary" htmlType="submit">
                  {TwoDepthData.content.content ? '수정하기' : '생성하기'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </div>
    </LayoutAdmin>
  );
}
export default ContentWrite;
