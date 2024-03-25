import { useContext, useEffect, useState } from 'react';
import { ButtonAction, TagAction } from './styles';
import { Table, Space } from 'antd';
import ModalDetailAssets from '../ModalDetailAssets';
import { RoleContext } from '../../../layout/RoleUserContext';

function TableAssets(props) {
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
    console.log(id);
    props.deleteAssets(id);
  };
  const handleUpdate = (record) => {
    props.setDataRecord(record);
    props.setIsModal(true);
  };

  useEffect(() => {
    let dataSource = [
      {
        title: props.type === 'category' ? 'Name category' : 'Name film',
        dataIndex: props.type === 'category' ? 'name' : 'title',
        key: props.type === 'category' ? 'name' : 'title',
        width: userInfo.role === 'superAdmin' ? '70%' : '85%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
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
                <ButtonAction>
                  <TagAction
                    color="warning"
                    onClick={() => handleUpdate(record)}>
                    Update
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
  }, [props.data]);

  return (
    <>
      <Table
        columns={dataColumn}
        dataSource={dataTable !== undefined && dataTable}
      />
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
