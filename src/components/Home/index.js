import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

function HomePage() {
  return (
    <Content
      style={{
        margin: '0 16px',
        overflow: 'auto !important',
      }}>
      Home
    </Content>
  );
}

export default HomePage;
