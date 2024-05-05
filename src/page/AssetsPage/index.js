import { useContext, useEffect, useState } from 'react';
import {
  DivAssets,
  DivAction,
  DivData,
  DivImport,
  Text,
  DivError,
  TextError,
  DivAddData,
  DivPagination,
} from './styles';
import { Button, Modal } from 'antd';
import { ImportOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllSeries,
  deleteSeries,
  addManySeries,
} from '../../redux/Action/Assets/series';
import {
  addManyMovies,
  deleteMovies,
  fetchAllMovies,
} from '../../redux/Action/Assets/movies';
import {
  fetchAllCategory,
  deleteCategory,
} from '../../redux/Action/Setting/category';
import TableAssets from '../../components/TableAssets';
import { RoleContext } from '../../contexts/RoleUserContext';
import LoadingComponent from '../../components/LoadingComponent';
import ModalAdd from '../../components/ModalAdd';
import FormModalContext from '../../contexts/FormModalContext';
import PaginationComponent from '../../components/Common/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingPage from '../LoadingPage';

function AssetsPage(props) {
  const [isModal, setIsModal] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFile, setDataFile] = useState(undefined);
  const [page, setPage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(RoleContext);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  let data, loading, error, dataFilm, dataCategory, count;
  const series = useSelector((state) => state.seriesSlice);
  const movies = useSelector((state) => state.moviesSlice);
  const category = useSelector((state) => state.categorySlice);
  if (props.type === 'series') {
    data = series.data;
    loading = series.loading;
    error = series.error;
    dataFilm = movies.data;
    count = series.count;
  }
  if (props.type === 'movies') {
    data = movies.data;
    loading = movies.loading;
    error = movies.error;
    dataCategory = category.data;
    count = movies.count;
  }
  if (props.type === 'category') {
    data = category.data;
    loading = category.loading;
    error = category.error;
    count = category.count;
  }

  const showModal = (type) => {
    setIsModal(true);
  };

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
    };

    setDataTable(tableData);
  }, [props.type, props.dataIndex, props.key, props.title, userInfo]);

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
  }, [props.type]);

  useEffect(() => {
    let pageNum;
    if (location.search !== '') {
      const searchParams = new URLSearchParams(location.search);

      for (let param of searchParams) {
        if (param[0] === 'page') {
          pageNum = parseInt(param[1]);
        }
      }
    } else {
      pageNum = 1;
    }

    if (props.type === 'series') {
      Promise.all([dispatch(fetchAllSeries(pageNum))]);
    } else if (props.type === 'movies') {
      Promise.all([dispatch(fetchAllMovies(pageNum))]);
    } else {
      Promise.all([dispatch(fetchAllCategory(pageNum))]);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [location.search, props.type, dispatch, page]);

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

  const handleOnchangeInput = (e) => {
    if (e.target.files[0] !== undefined) {
      setDataFile(e.target.files[0]);
      setIsModalOpen(true);
      e.target.value = '';
    }
  };

  const handleOk = () => {
    if (props.type === 'series') {
      dispatch(addManySeries(dataFile));
    }
    if (props.type === 'movies') {
      dispatch(addManyMovies(dataFile));
    }
    setIsModalOpen(false);
    setDataFile(undefined);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDataFile(undefined);
  };

  const handleOnChangePage = (page, size) => {
    setPage(page);
    navigate('/' + props.type + '?page=' + page);
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

  // if (isLoading === false) {
  //   return (
  //     <DivAssets>
  //       <LoadingPage />
  //     </DivAssets>
  //   );
  // }
  return (
    <DivAssets>
      <DivAddData>
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
        <DivImport>
          <Text htmlFor="file">
            <ImportOutlined /> Import many {props.type}
          </Text>
          <input
            id="file"
            name="file"
            type="file"
            hidden
            onChange={(e) => handleOnchangeInput(e)}
          />
        </DivImport>
      </DivAddData>
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
      <Modal
        title={'Add data ' + props.type}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>
          Are you sure you want to add all the data {props.type} from the csv
          file?
        </p>
      </Modal>

      <DivData>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <TableAssets
              data={data}
              deleteAssets={deleteAssets}
              setDataRecord={setDataRecord}
              type={props.type}
              setIsModal={setIsModal}
              dataTable={dataTable}
            />
            <DivPagination>
              <PaginationComponent
                count={count}
                page={page}
                handleOnChangePage={handleOnChangePage}
              />
            </DivPagination>
          </>
        )}
      </DivData>
    </DivAssets>
  );
}

export default AssetsPage;
