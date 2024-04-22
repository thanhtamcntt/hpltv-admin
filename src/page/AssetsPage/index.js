import { useContext, useEffect, useState } from 'react';
import {
  DivAssets,
  DivAction,
  DivData,
  DivLoading,
  TextLoading,
  DivError,
  TextError,
} from './styles';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSeries, deleteSeries } from '../../redux/Action/Assets/series';
import { deleteMovies, fetchAllMovies } from '../../redux/Action/Assets/movies';
import {
  fetchAllCategory,
  deleteCategory,
} from '../../redux/Action/Setting/category';
import TableAssets from '../../components/TableAssets';
import { RoleContext } from '../../contexts/RoleUserContext';
import LoadingComponent from '../../components/LoadingComponent';
import ModalAdd from '../../components/ModalAdd';
import FormModalContext from '../../contexts/FormModalContext';

function AssetsPage(props) {
  const [isModal, setIsModal] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);

  const { userInfo } = useContext(RoleContext);

  const dispatch = useDispatch();
  let data, loading, error, dataFilm, dataCategory;
  const series = useSelector((state) => state.seriesSlice);
  const movies = useSelector((state) => state.moviesSlice);
  const category = useSelector((state) => state.categorySlice);
  if (props.type === 'series') {
    data = series.data;
    loading = series.loading;
    error = series.error;
    dataFilm = movies.data;
  }
  if (props.type === 'movies') {
    data = movies.data;
    loading = movies.loading;
    error = movies.error;
    dataCategory = category.data;
  }
  if (props.type === 'category') {
    data = category.data;
    loading = category.loading;
    error = category.error;
  }

  const showModal = (type) => {
    setIsModal(true);
  };

  useEffect(() => {
    Promise.all([
      dispatch(fetchAllMovies()),
      dispatch(fetchAllCategory()),
      dispatch(fetchAllSeries()),
    ]);
  }, [props.type, dispatch]);

  useEffect(() => {
      const tableData = {
        title: {
          title: props.title,
          dataIndex: props.dataIndex,
          key: props.key,
          width: userInfo.role === 'superAdmin' ? '70%' : '85%',
          onCell: () => ({
            style: { fontWeight: '500' },
          }),
        },
      }

      setDataTable(tableData)
  }, [props.type,props.dataIndex, props.key,props.title]);

  const deleteAssets = (id) => {
    if (props.type === 'movies') {
      dispatch(deleteMovies(id));
    }
    if (props.type === 'category') {
      dispatch(deleteCategory(id));
    }
    if (props.type === 'series') {
      dispatch(deleteSeries(id));
    }
  };

  if (error) {
    return (
      <DivAssets>
        {loading ? (
          <LoadingComponent />
        ) : (
          <DivError>
            <TextError>
              The server is having problems, please try again later!!!
            </TextError>
          </DivError>
        )}
      </DivAssets>
    );
  }
  return (
    <DivAssets>
      {userInfo.role === 'superAdmin' &&
        (props.type === 'series' ? (
          <DivAction>
            <Button type="primary" onClick={showModal}>
              Add Series
            </Button>
          </DivAction>
        ) : props.type === 'movies' ? (
          <DivAction>
            <Button type="primary" onClick={showModal}>
              Add Movies
            </Button>
          </DivAction>
        ) : (
          <DivAction>
            <Button type="primary" onClick={showModal}>
              Add Category
            </Button>
          </DivAction>
        ))}
      <FormModalContext.Provider
        value={{ type: props.type, dataRecord: dataRecord }}>
        <ModalAdd
          isModal={isModal}
          setIsModal={setIsModal}
          setDataRecord={setDataRecord}
          dataFilm={dataFilm}
          dataCategory={dataCategory}
        />
      </FormModalContext.Provider>

      {loading ? (
        <LoadingComponent/>
      ) : (
        <DivData>
          <TableAssets
            data={data}
            deleteAssets={deleteAssets}
            setDataRecord={setDataRecord}
            type={props.type}
            setIsModal={setIsModal}
            dataTable={dataTable}
          />
        </DivData>
      )}
    </DivAssets>
  );
}

export default AssetsPage;
