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
import { RoleContext } from '../../contexts/UserContext';
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
  postBannedSubscriber,
} from '../../redux/Action/Manage/subscriber';
import PaginationComponent from '../../components/Common/Pagination';
import {
  fetchAllSubscriberBanned,
  postRecoverSubscriber,
} from '../../redux/Action/Manage/bannedAccount';

function ManageUserPage(props) {
  const { userInfo } = useContext(RoleContext);

  const [isModal, setIsModal] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdReset, setUserIdReset] = useState();
  const [textModal, setTextModal] = useState();
  const [isOptions, setIsOptions] = useState(false);

  const dispatch = useDispatch();
  let data, loading, error;
  const user = useSelector((state) => state.userSlice);
  const subscriber = useSelector((state) => state.subscriberSlice);
  const bannedSubscriber = useSelector((state) => state.subscriberBannedSlice);
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
  if (props.type === 'banned-subscriber') {
    data = bannedSubscriber.data;
    loading = bannedSubscriber.loading;
    error = bannedSubscriber.error;
  }

  const handleOk = async () => {
    const data = {
      userId: userIdReset,
      type: props.type,
    };
    if (isOptions === 1) {
      if (props.type === 'user') {
        Promise.all([dispatch(deleteUser(data))]);
      } else {
        Promise.all([dispatch(deleteSubscriber(data))]);
      }
    } else if (isOptions === 2) {
      if (props.type === 'user') {
        Promise.all([dispatch(resetPasswordUser(data))]);
      } else {
        Promise.all([dispatch(resetPasswordSubscriber(data))]);
      }
    } else if (isOptions === 3) {
      Promise.all([dispatch(postBannedSubscriber(data))]);
    } else {
      Promise.all([dispatch(postRecoverSubscriber(data))]);
    }

    setUserIdReset();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setUserIdReset();
    setIsModalOpen(false);
  };

  useEffect(() => {
    Promise.all([
      dispatch(fetchAllUser()),
      dispatch(fetchAllSubscriber()),
      dispatch(fetchAllSubscriberBanned()),
    ]);
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
  }, [props.type, userInfo]);

  const showModal = (type) => {
    setIsModal(true);
  };

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
            <Button type="primary" onClick={showModal}>
              Add User
            </Button>
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
              setIsOptions={setIsOptions}
            />
            {data.length > 0 && (
              <DivPagination>
                <PaginationComponent />
              </DivPagination>
            )}
          </DivData>
        )}
      </DivManage>
      <Modal
        title={
          isOptions === 1
            ? 'Delete Password'
            : isOptions === 2
            ? 'Reset Password'
            : isOptions === 3
            ? 'Banned Account'
            : 'Recover Account'
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>{textModal}</p>
      </Modal>
    </>
  );
}

export default ManageUserPage;
