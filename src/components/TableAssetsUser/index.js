import { useContext, useEffect, useState } from 'react';
import { ButtonAction, TagAction } from './styles';
import { Table, Space } from 'antd';
import { RoleContext } from '../../contexts/RoleUserContext';
import ModalDetailUser from '../ModalDetailUser';

function TableAssetsUser(props) {
  const [dataTable, setDataTable] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [asset, setAsset] = useState();

  const { userInfo } = useContext(RoleContext);

  const handleDetail = (record) => {
    setAsset(record);
    setIsModalDetail(true);
  };

  const handleDelete = (id) => {
    props.setTextModal('Are you sure you want to delete this account?');
    props.setUserIdReset(id);
    props.setIsDelete(true);
    props.setIsModalOpen(true);
  };
  const handleUpdate = (record) => {
    props.setUserIdReset(record._id);
    props.setIsDelete(false);
    props.setTextModal(
      "Are you sure you want to reset this account's password?",
    );
    props.setIsModalOpen(true);
  };

  useEffect(() => {
    let dataSource = [
      {
        title: 'Action',
        key: 'action',
        width: userInfo.role === 'superAdmin' ? '30%' : '5%',
        onCell: () => ({
          style: { TextAlign: 'center' },
        }),
        render: (_, record) => (
          <Space size="large">
            <ButtonAction onClick={() => handleDetail(record)}>
              <TagAction color="processing">Detail</TagAction>
            </ButtonAction>
            {userInfo && userInfo.role === 'superAdmin' && (
              <>
                <ButtonAction>
                  <TagAction
                    color="warning"
                    onClick={() => handleUpdate(record)}>
                    Reset Password
                  </TagAction>
                </ButtonAction>
                <ButtonAction onClick={() => handleDelete(record._id)}>
                  <TagAction color="error">Delete</TagAction>
                </ButtonAction>
              </>
            )}
          </Space>
        ),
      },
    ];

    if (props.dataTable) {
      Object.keys(props.dataTable).forEach((key) => {
        dataSource.unshift(props.dataTable[key]);
      });
      setDataColumn(dataSource);
      if (props.data.length > 0) {
        if (props.data.length > 0) {
          let dataSource = [];
          for (let data of props.data) {
            dataSource.push(data);
          }
          setDataTable(dataSource);
        }
      }
    }
  }, [props.data, props.dataTable]);

  return (
    <>
      <Table
        columns={dataColumn}
        dataSource={dataTable !== undefined && dataTable}
        pagination={false}
      />
      {asset && (
        <ModalDetailUser
          isModalDetail={isModalDetail}
          setIsModalDetail={setIsModalDetail}
          asset={asset}
          type={props.type}
        />
      )}
    </>
  );
}

export default TableAssetsUser;
