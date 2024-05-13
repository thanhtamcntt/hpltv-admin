import React from 'react';
import { Layout } from 'antd';
import { TitleContent } from './styles';
const { Header } = Layout;

function HeaderAdmin({ bgColor, title }) {
  return (
    <Header
      style={{
        padding: 0,
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '2%',
      }}>
      <TitleContent>{title}</TitleContent>
    </Header>
  );
}
export default HeaderAdmin;
