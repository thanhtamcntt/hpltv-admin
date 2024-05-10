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
  fetchAllSeriesTrash,
  postRecoverSeries,
} from '../../redux/Action/Assets/trashSeries';
import {
  fetchAllMoviesTrash,
  postRecoverMovies,
} from '../../redux/Action/Assets/trashMovies';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function AssetsPage(props) {
  const [isModal, setIsModal] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFile, setDataFile] = useState(undefined);
  const [page, setPage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [dataId, setDataId] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [textModal, setTextModal] = useState(false);
  const { userInfo } = useContext(RoleContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { seriesId } = useParams();
  console.log(seriesId);

  const dispatch = useDispatch();
  let data, loading, error, count;
  const series = useSelector((state) => state.seriesSlice);
  const movies = useSelector((state) => state.moviesSlice);
  const category = useSelector((state) => state.categorySlice);
  const trashMovies = useSelector((state) => state.trashMoviesSlice);
  const trashSeries = useSelector((state) => state.trashSeriesSlice);
  if (props.type === 'series') {
    data = series.data;
    loading = series.loading;
    error = series.error;
    count = series.count;
  }
  if (props.type === 'movies') {
    data = movies.data;
    loading = movies.loading;
    error = movies.error;
    count = movies.count;
  }
  if (props.type === 'category') {
    data = category.data;
    loading = category.loading;
    error = category.error;
    count = category.count;
  }
  if (props.type === 'trash-movies') {
    data = trashMovies.data;
    loading = trashMovies.loading;
    error = trashMovies.error;
    count = trashMovies.count;
  }
  if (props.type === 'trash-series') {
    data = trashSeries.data;
    loading = trashSeries.loading;
    error = trashSeries.error;
    count = trashSeries.count;
  }

  const showModal = (type) => {
    setIsModal(true);
  };

  useEffect(() => {
    console.log(props.title, props.dataIndex, props.key);
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
    setIsLoading(true);
    setPage(1);
  }, [props.type, props.dataIndex, props.key, props.title, userInfo]);

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
      if (seriesId) {
      } else {
        Promise.all([dispatch(fetchAllSeries(pageNum))]);
      }
    } else if (props.type === 'movies') {
      Promise.all([dispatch(fetchAllMovies(pageNum))]);
    } else if (props.type === 'category') {
      Promise.all([dispatch(fetchAllCategory(pageNum))]);
    } else if (props.type === 'trash-movies') {
      Promise.all([dispatch(fetchAllMoviesTrash(pageNum))]);
    } else {
      Promise.all([dispatch(fetchAllSeriesTrash(pageNum))]);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [location.search, props.type, dispatch, page]);

  const handleOnchangeInput = (e) => {
    if (e.target.files[0] !== undefined) {
      setDataFile(e.target.files[0]);
      setTextModal(
        'Are you sure you want to add all the data {props.type} from the csv file?',
      );
      setTypeModal('file');
      setIsModalOpen(true);
      e.target.value = '';
    }
  };

  const handleOk = () => {
    console.log(typeModal);
    if (typeModal === 'file') {
      if (props.type === 'series') {
        dispatch(addManySeries(dataFile));
      }
      if (props.type === 'movies') {
        dispatch(addManyMovies(dataFile));
      }
    } else if (typeModal === 'delete') {
      if (props.type === 'movies') {
        dispatch(deleteMovies({ dataId: dataId, type: typeModal }));
      }
      if (props.type === 'category') {
        dispatch(deleteCategory(dataId));
      }
      if (props.type === 'series') {
        dispatch(deleteSeries({ dataId: dataId, type: typeModal }));
      }
    } else if (typeModal === 'recover') {
      if (props.type === 'trash-movies') {
        dispatch(postRecoverMovies({ dataId: dataId }));
      }
      if (props.type === 'trash-series') {
        dispatch(postRecoverSeries({ dataId: dataId }));
      }
    } else {
      if (props.type === 'trash-movies') {
        dispatch(deleteMovies({ dataId: dataId, type: typeModal }));
      }

      if (props.type === 'trash-series') {
        dispatch(deleteSeries({ dataId: dataId, type: typeModal }));
      }
    }
    setTypeModal(undefined);
    setDataFile(undefined);
    setIsModalOpen(false);

    if (data.length - 1 === 0 && page > 1) {
      setPage((prev) => prev - 1);
      navigate('/' + props.type + '?page=' + (page - 1));
    }
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
        {isLoading ? (
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
          ) : props.type === 'category' ? (
            <DivAction>
              <Button type="primary" onClick={showModal}>
                Add Category
              </Button>
            </DivAction>
          ) : null)}
        {props.type === 'movies' && (
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
        )}
      </DivAddData>
      <FormModalContext.Provider
        value={{ type: props.type, dataRecord: dataRecord }}>
        <ModalAdd
          isModal={isModal}
          setIsModal={setIsModal}
          setDataRecord={setDataRecord}
        />
      </FormModalContext.Provider>
      <Modal
        title={
          props.type === 'movies' || props.type === 'series'
            ? 'Add data ' + props.type
            : typeModal === 'delete'
            ? 'Delete data'
            : typeModal === 'recover'
            ? 'Recover data'
            : 'Destroy data'
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>{textModal}</p>
      </Modal>

      <DivData>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <TableAssets
              data={data}
              setDataRecord={setDataRecord}
              type={props.type}
              setIsModal={setIsModal}
              dataTable={dataTable}
              setDataId={setDataId}
              setIsModalOpen={setIsModalOpen}
              setTypeModal={setTypeModal}
              setTextModal={setTextModal}
            />
            {data.length > 0 && (
              <DivPagination>
                <PaginationComponent
                  count={count}
                  page={page}
                  handleOnChangePage={handleOnChangePage}
                />
              </DivPagination>
            )}
          </>
        )}
      </DivData>
    </DivAssets>
  );
}

export default AssetsPage;
