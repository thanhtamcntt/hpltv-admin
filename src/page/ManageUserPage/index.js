import { Button, Modal } from 'antd';
import {
  DivManage,
  DivAction,
  DivError,
  TextError,
  DivData,
  DivPagination,
} from './styles';
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../contexts/RoleUserContext';
import FormModalContext from '../../contexts/FormModalContext';
import ModalAdd from '../../components/ModalAdd';
import LoadingComponent from '../../components/LoadingComponent';
import TableAssetsUser from '../../components/TableAssetsUser';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  fetchAllUser,
  resetPasswordUser,
} from '../../redux/Action/Manage/user';
import {
  deleteSubscriber,
  fetchAllSubscriber,
  resetPasswordSubscriber,
} from '../../redux/Action/Manage/subscriber';
import PaginationComponent from '../../components/Common/Pagination';

function ManageUserPage(props) {
  const { userInfo } = useContext(RoleContext);

  const [isModal, setIsModal] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdReset, setUserIdReset] = useState();
  const [textModal, setTextModal] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useDispatch();
  let data, loading, error;
  const user = useSelector((state) => state.userSlice);
  const subscriber = useSelector((state) => state.subscriberSlice);
  if (props.type === 'user') {
    data = user.data;
    loading = user.loading;
    error = user.error;
  }
  if (props.type === 'subscriber') {
    data = subscriber.data;
    loading = subscriber.loading;
    error = subscriber.error;
  }

  const handleOk = async () => {
    const data = {
      userId: userIdReset,
      type: props.type,
    };
    if (isDelete === true) {
      if (props.type === 'user') {
        Promise.all([dispatch(deleteUser(data))]);
      } else {
        Promise.all([dispatch(deleteSubscriber(data))]);
      }
    } else {
      if (props.type === 'user') {
        Promise.all([dispatch(resetPasswordUser(data))]);
      } else {
        Promise.all([dispatch(resetPasswordSubscriber(data))]);
      }
    }

    setUserIdReset();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setUserIdReset();
    setIsModalOpen(false);
  };

  useEffect(() => {
    Promise.all([dispatch(fetchAllUser()), dispatch(fetchAllSubscriber())]);
  }, [props.type, dispatch]);

  useEffect(() => {
    const tableData = {
      title4: {
        title: 'Email Address',
        dataIndex: 'email',
        key: 'email',
        width: userInfo.role === 'superAdmin' ? '30%' : '25%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title3: {
        title: 'Gender',
        dataIndex: 'sex',
        key: 'sex',
        width: userInfo.role === 'superAdmin' ? '20%' : '15%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title2: {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        width: userInfo.role === 'superAdmin' ? '20%' : '15%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title: {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        width: userInfo.role === 'superAdmin' ? '20%' : '15%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
    };
    setDataTable(tableData);
  }, [props.type]);

  if (error) {
    return (
      <DivManage>
        {loading ? (
          <LoadingComponent />
        ) : (
          <DivError>
            <TextError>
              The server is having problems, please try again later!!!
            </TextError>
          </DivError>
        )}
      </DivManage>
    );
  }

  return (
    <>
      <DivManage>
        {userInfo.role === 'superAdmin' && props.type === 'user' && (
          <DivAction>
            <Button type="primary">Add User</Button>
          </DivAction>
        )}

        <FormModalContext.Provider
          value={{ type: props.type, dataRecord: dataRecord }}>
          <ModalAdd
            isModal={isModal}
            setIsModal={setIsModal}
            setDataRecord={setDataRecord}
            dataFilm={null}
            dataCategory={null}
          />
        </FormModalContext.Provider>

        {loading ? (
          <LoadingComponent />
        ) : (
          <DivData>
            <TableAssetsUser
              data={data}
              setDataRecord={setDataRecord}
              type={props.type}
              setIsModal={setIsModal}
              dataTable={dataTable}
              setUserIdReset={setUserIdReset}
              setIsModalOpen={setIsModalOpen}
              setTextModal={setTextModal}
              setIsDelete={setIsDelete}
            />
            <DivPagination>
              <PaginationComponent />
            </DivPagination>
          </DivData>
        )}
      </DivManage>
      <Modal
        title={isDelete ? 'Delete Password' : 'Reset Password'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>{textModal}</p>
      </Modal>
    </>
  );
}

export default ManageUserPage;
