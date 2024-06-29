import React, { useContext } from 'react';
import { Dropdown } from 'antd';
import {
  TitleContent,
  DivRight,
  DivLeft,
  DivHeader,
  DivInfo,
  AvatarUser,
  LabelText,
  DivLabel,
} from './styles';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { RoleContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

function HeaderAdmin({ bgColor, title }) {
  const { userInfo } = useContext(RoleContext);

  const items = [
    {
      key: '1',
      type: 'group',
      label: (
        <DivLabel>
          <LabelText>
            {userInfo.firstName} {userInfo.lastName}
            <br />
            {userInfo.email}
          </LabelText>
        </DivLabel>
      ),
    },
    {
      key: '2',
      label: <Link to={'/profile'}>Profile</Link>,
    },
  ];
  return (
    <DivHeader>
      <DivRight>
        <BellOutlined />
        <DivInfo>
          <Dropdown
            menu={{
              items,
            }}>
            <a href="/" onClick={(e) => e.preventDefault()}>
              <AvatarUser src={userInfo.avatarUser.url} />
              <DownOutlined />
            </a>
          </Dropdown>
        </DivInfo>
      </DivRight>
    </DivHeader>
  );
}
export default HeaderAdmin;
