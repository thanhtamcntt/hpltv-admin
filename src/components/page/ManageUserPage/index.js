import { Button } from 'antd';
import { DivManage, DivAction } from './styles';
import { useContext } from 'react';
import { RoleContext } from '../../../layout/RoleUserContext';

function ManageUserPage(props) {
  const { userInfo } = useContext(RoleContext);
  return (
    <DivManage>
      {userInfo.role === 'superAdmin' &&
        (props.type === 'user' ? (
          <DivAction>
            <Button type="primary">Add User</Button>
          </DivAction>
        ) : (
          <DivAction>
            <Button type="primary">Add Subscriber</Button>
          </DivAction>
        ))}
      {/*
      {isModalSeries ? (
        <ModalAddSeries
          isModalSeries={isModalSeries}
          setIsModalSeries={setIsModalSeries}
          setDataRecord={setDataRecord}
          dataRecord={dataRecord}
          dataFilm={dataFilm}
        />
      ) : isModalMovies ? (
        <ModalAddMovies
          isModalMovies={isModalMovies}
          setIsModalMovies={setIsModalMovies}
          setDataRecord={setDataRecord}
          dataRecord={dataRecord}
          dataCategory={dataCategory}
        />
      ) : (
        <ModalAddCategory
          isModalCategory={isModalCategory}
          setIsModalCategory={setIsModalCategory}
          setDataRecord={setDataRecord}
          dataRecord={dataRecord}
        />
      )}
      {loading ? (
        <DivLoading>
          <div>
            <LoadingOutlined />
          </div>
          <TextLoading>Loading...</TextLoading>
        </DivLoading>
      ) : (
        <DivData>
          <TableAssets
            data={data}
            deleteAssets={deleteAssets}
            setDataRecord={setDataRecord}
            type={props.type}
            setIsModal={
              props.type === 'series'
                ? setIsModalSeries
                : props.type === 'movies'
                ? setIsModalMovies
                : setIsModalCategory
            }
          />
        </DivData>
      )} */}
    </DivManage>
  );
}

export default ManageUserPage;
