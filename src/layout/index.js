import React, { useState } from 'react';
import {
  DollarOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import HeaderAdmin from '../components/Header';
import FooterAdmin from '../components/Footer';
import SiderAdmin from './SiderLayout';
import ChildrenContext from './ChildrenContext';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { DivContainerWeb, DivSider } from './styles';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Assets', 'assets', <DollarOutlined />, [
    getItem('Series', 'series'),
    getItem('Movies', 'movies'),
  ]),
  getItem('Setting', 'setting', <SettingOutlined />, [
    getItem('Category', 'category'),
  ]),
  getItem('Manage', 'manage', <TeamOutlined />, [
    getItem('User', 'user'),
    getItem('Subscriber', 'subscriber'),
  ]),
  getItem('Logout', 'logout', <LogoutOutlined />),
];

function LayoutAdmin({ children }) {
  const [select, setSelect] = useState(window.location.pathname.slice(1));
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelect = (select) => {
    navigate(`/${select}`);
  };

  if (!items) {
    return (
      <div className="loading-component">
        <div>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      </div>
    );
  }

  return (
    <DivContainerWeb>
      <DivSider>
        <div>
          <SiderAdmin
            items={items}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            select={select}
            setSelect={setSelect}
            handleSelect={handleSelect}
          />
        </div>
      </DivSider>
      <Layout className="layout-content-web">
        <HeaderAdmin
          bgColor={colorBgContainer}
          title={`${select}`.toUpperCase()}
        />
        <ChildrenContext.Provider value={{ select: select }}>
          {children}
        </ChildrenContext.Provider>

        <FooterAdmin />
      </Layout>
    </DivContainerWeb>
  );
}
export default LayoutAdmin;
