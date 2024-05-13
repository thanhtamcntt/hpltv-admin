import React, { useContext, useEffect, useState } from 'react';
import { ButtonAction, TagAction } from './styles';
import { Table, Space } from 'antd';
import ModalDetailAssets from '../ModalDetailAssets';
import { RoleContext } from '../../contexts/RoleUserContext';
import LoadingPage from '../../page/LoadingPage';
import { useNavigate } from 'react-router-dom';
import ChildrenContext from '../../contexts/ChildrenContext';

function TableAssets(props) {
  const [dataTable, setDataTable] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [asset, setAsset] = useState();

  const navigate = useNavigate();
  const { userInfo } = useContext(RoleContext);

  const handleDetail = (record) => {
    if (props.type === 'series') {
      console.log(record._id);
      navigate('/series/' + record._id);
    } else {
      setAsset(record);
      setIsModalDetail(true);
    }
  };

  const handleRecover = (record, type) => {
    props.setDataId(record._id);
    props.setTypeModal(type);
    props.setTextModal('Are you sure you want to recover this data?');
    props.setIsModalOpen(true);
  };

  const handleDelete = (record, type) => {
    props.setDataId(record._id);
    props.setTypeModal(type);
    props.setTextModal('Are you sure you want to delete this data?');
    props.setIsModalOpen(true);
  };
  const handleDestroy = (record, type) => {
    props.setDataId(record._id);
    props.setTypeModal(type);
    props.setTextModal('Are you sure you want to destroy this data?');
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
                {props.type !== 'trash-movies' &&
                props.type !== 'trash-series' ? (
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
                ) : (
                  <ButtonAction>
                    <TagAction
                      color="warning"
                      onClick={() => handleRecover(record, 'recover')}>
                      Recover
                    </TagAction>
                  </ButtonAction>
                )}
                {props.type !== 'trash-movies' &&
                props.type !== 'trash-series' ? (
                  <ButtonAction onClick={() => handleDelete(record, 'delete')}>
                    <TagAction color="error">Delete</TagAction>
                  </ButtonAction>
                ) : (
                  <ButtonAction
                    onClick={() => handleDestroy(record, 'destroy')}>
                    <TagAction color="error">Destroy</TagAction>
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

  if (!dataTable) {
    return <LoadingPage />;
  }

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
        <ModalDetailAssets
          isModalDetail={isModalDetail}
          setIsModalDetail={setIsModalDetail}
          asset={asset}
          type={props.type}
        />
      )}
    </>
  );
}

export default TableAssets;
