import React, { useEffect } from 'react';
import { useTwoDepth } from '@hooks/useTwoDepth';
import { useOneDepth } from '@hooks/useOneDepth';
import { Layout, Typography } from 'antd';
const { Content } = Layout;
const { Title, Text } = Typography;

type faqContentsType = {
  selectOneDepth: string;
};

function FaqContent({ selectOneDepth }: faqContentsType) {
  const { oneDepthData } = useOneDepth(selectOneDepth);
  // const { oneDepthData } = useTwoDepth(selectOneDepth);

  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      {oneDepthData?.two_depths.map((twoDepthItem) => {
        return (
          <div key={twoDepthItem.key}>
            <Title level={3}>{twoDepthItem.label}</Title>
            <Text>
              <span
                dangerouslySetInnerHTML={{
                  __html: twoDepthItem.content.data?.content,
                }}
              />
            </Text>
            <br />
            <br />
          </div>
        );
      })}
    </Content>
  );
}

export default FaqContent;
