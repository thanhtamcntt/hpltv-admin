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
import ModalAddMovies from '../../Common/ModalAddMovie';
import ModalAddSeries from '../../Common/ModalAddSeries';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllSeries,
  deleteSeries,
} from '../../../redux/Action/Assets/series';
import {
  deleteMovies,
  fetchAllMovies,
} from '../../../redux/Action/Assets/movies';
import {
  fetchAllCategory,
  deleteCategory,
} from '../../../redux/Action/Setting/category';
import TableAssets from '../../Common/TableAssets';
import ModalAddCategory from '../../Common/ModalAddCategory';
import { RoleContext } from '../../../layout/RoleUserContext';

function AssetsPage(props) {
  const [isModalSeries, setIsModalSeries] = useState(false);
  const [isModalMovies, setIsModalMovies] = useState(false);
  const [isModalCategory, setIsModalCategory] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);

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
    switch (type) {
      case 'Series':
        setIsModalSeries(true);
        break;
      case 'Movies':
        setIsModalMovies(true);
        break;
      case 'Category':
        setIsModalCategory(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllCategory());
    dispatch(fetchAllSeries());
  }, [props.type, dispatch]);

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
        {userInfo.role === 'superAdmin' &&
          (props.type === 'series' ? (
            <DivAction>
              <Button type="primary" onClick={() => showModal('Series')}>
                Add Series
              </Button>
            </DivAction>
          ) : props.type === 'movies' ? (
            <DivAction>
              <Button type="primary" onClick={() => showModal('Movies')}>
                Add Movies
              </Button>
            </DivAction>
          ) : (
            <DivAction>
              <Button type="primary" onClick={() => showModal('Category')}>
                Add Category
              </Button>
            </DivAction>
          ))}
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
          </DivLoading>
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
            <Button type="primary" onClick={() => showModal('Series')}>
              Add Series
            </Button>
          </DivAction>
        ) : props.type === 'movies' ? (
          <DivAction>
            <Button type="primary" onClick={() => showModal('Movies')}>
              Add Movies
            </Button>
          </DivAction>
        ) : (
          <DivAction>
            <Button type="primary" onClick={() => showModal('Category')}>
              Add Category
            </Button>
          </DivAction>
        ))}
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
      )}
    </DivAssets>
  );
}

export default AssetsPage;
