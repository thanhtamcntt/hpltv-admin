import React, { useContext, useEffect, useState } from 'react';
import { ButtonAction, TagAction } from './styles';
import { Table, Space } from 'antd';
import { RoleContext } from '../../contexts/UserContext';
import ModalDetailQuestion from '../ModalDetailQuestion';

function TableAssetsSetting(props) {
  const [dataTable, setDataTable] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [asset, setAsset] = useState();

  const { userInfo } = useContext(RoleContext);

  const handleDetail = (record) => {
    setAsset(record);
    setIsModalDetail(true);
  };

  const handleDelete = (record, type) => {
    props.setDataId(record._id);
    props.setTypeModal(type);
    props.setTextModal('Are you sure you want to delete this data?');
    props.setIsModalOpen(true);
  };

  useEffect(() => {
    setDataTable(undefined);
    let dataSource = [
      {
        title: 'Action',
        key: 'action',
        onCell: () => ({
          style: { TextAlign: 'center' },
        }),
        render: (_, record) => (
          <Space size="large">
            <ButtonAction onClick={() => handleDetail(record)}>
              <TagAction color="processing">Detail</TagAction>
            </ButtonAction>
            {userInfo.role === 'superAdmin' && (
              <>
                {props.type === 'common-questions' && (
                  <ButtonAction>
                    <TagAction
                      color="warning"
                      onClick={() => {
                        props.setDataRecord(record);
                        props.setIsModal(true);
                      }}>
                      Update
                    </TagAction>
                  </ButtonAction>
                )}
                {props.type === 'customer-questions' && (
                  <ButtonAction>
                    <TagAction
                      color="warning"
                      onClick={() => {
                        props.setDataRecord(record);
                        props.setIsModal(true);
                      }}>
                      Resolve
                    </TagAction>
                  </ButtonAction>
                )}
                {props.type === 'common-questions' && (
                  <ButtonAction onClick={() => handleDelete(record, 'delete')}>
                    <TagAction color="error">Delete</TagAction>
                  </ButtonAction>
                )}
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
      if (props.data.length >= 0) {
        if (props.data.length >= 0) {
          let dataSource = [];
          for (let data of props.data) {
            dataSource.push(data);
          }
          setDataTable(dataSource);
        }
      }
    }
  }, [props.data, props.dataTable, userInfo, props, props.type]);

  return (
    <>
      {dataTable && (
        <Table
          columns={dataColumn}
          dataSource={dataTable !== undefined && dataTable}
          pagination={false}
        />
      )}
      {asset && (
        <ModalDetailQuestion
          isModalDetail={isModalDetail}
          setIsModalDetail={setIsModalDetail}
          asset={asset}
          type={props.type}
        />
      )}
    </>
  );
}

export default TableAssetsSetting;
