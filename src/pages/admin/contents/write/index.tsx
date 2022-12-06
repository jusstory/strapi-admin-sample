import React, { useState } from 'react';
import LayoutAdmin from '@components/admin/layoutAdmin';
import { useTwoDepth, useEditTwoDepth } from '@hooks/useTwoDepth';
import { useEditTwoDepthContent } from '@hooks/useTwoDepthContent';
import { Button, Checkbox, Form, Input } from 'antd';
const { TextArea } = Input;

function ContentWrite() {
  const [crateTwoDepthTitle, setCreateTwoDepthTitle] = useState(null);
  const [crateTwoDepthContents, setCreateTwoDepthContents] = useState(null);
  const { createTwoDepth, changeTwoDepthName, deleteTwoDepth } =
    useEditTwoDepth();
  const { createTwoDepthContent } = useEditTwoDepthContent();

  const onValuesChange = (changedValues) => {
    const changedKey = Object.keys(changedValues)[0];
    const changedValue = Object.values(changedValues)[0];
    if (changedKey === 'title') {
      setCreateTwoDepthTitle(changedValue);
    } else if (changedKey === 'content') {
      setCreateTwoDepthContents(changedValue);
    }
  };

  const onCreateTwoDepth = () => {
    createTwoDepth({
      data: {
        one_depth: localStorage.onOneDepthID,
        two_depth: crateTwoDepthTitle,
        // content: crateTwoDepthContents,
      },
    });
  };

  const onFinish = (values: any) => {
    onCreateTwoDepth();
  };

  return (
    <LayoutAdmin>
      <div>
        <h2>Two Depth contents 생성</h2>
        <br />
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
          autoComplete="off"
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
            />
          </Form.Item>

          <Form.Item
            label="content"
            name="content"
            rules={[{ required: true, message: '내용을 입력하세요.' }]}
          >
            <TextArea
              // value={textEditorContents}
              name="content"
              placeholder={''}
              style={{ height: '300px' }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
            <Button type="primary" htmlType="submit">
              생성하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayoutAdmin>
  );
}

export default ContentWrite;
