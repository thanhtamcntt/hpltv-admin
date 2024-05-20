import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../contexts/RoleUserContext';
import {
  DivPayment,
  DivAddDataPayment,
  DivAction,
  DivTable,
  DivPagination,
} from './styles';
import { Button } from 'antd';
import LookInfo from '../../components/Common/LookComponent';
import TableAssets from '../../components/TableAssets';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrder, fetchAllOrderLook } from '../../redux/Action/Payment';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationComponent from '../../components/Common/Pagination';
import LoadingComponent from '../../components/LoadingComponent';

function PaymentAndPackagePage(props) {
  const [dataPayment, setDataPayment] = useState();
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [textLook, setTextLook] = useState('');
  const [valuePackage, setValuePackage] = useState('All');

  const { userInfo } = useContext(RoleContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { look, textSearch, textPackage } = location.state || false;

  let data, loading, error, count;
  const payment = useSelector((state) => state.paymentSlice);
  data = payment.data;
  loading = payment.loading;
  error = payment.error;
  count = payment.count;
  console.log(data);

  useEffect(() => {
    const fetchDataPayment = async () => {
      const response = await fetch(process.env.REACT_APP_API_GET_DATA_PAYMENT);
      const dataJson = await response.json();
      let data = [{ label: 'All', value: 'all' }];
      for (let i = 0; i < dataJson.data.length; i++) {
        data.push({
          label: dataJson.data[i].typePack,
          value: dataJson.data[i]._id,
        });
      }
      setDataPayment(data);
    };
    fetchDataPayment();
  }, []);

  useEffect(() => {
    const tableData = {
      title5: {
        title: 'Price package(monthly)',
        dataIndex: 'monthlyPrice',
        key: 'monthlyPrice',
        width: '15%',
        render: (text) => `$${text}`,
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title4: {
        title: 'Type package',
        dataIndex: 'typePack',
        key: 'typePack',
        width: '15%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title3: {
        title: 'Email address',
        dataIndex: 'email',
        key: 'email',
        width: '20%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title2: {
        title: 'last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        width: '10%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title: {
        title: 'first Name',
        dataIndex: 'firstName',
        key: 'firstName',
        width: '10%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
    };

    setDataTable(tableData);
    setIsLoading(true);
    setPage(1);
  }, [props.type, userInfo]);

  useEffect(() => {
    console.log(props.type);
    let pageNum = getPage();
    setTextLook('');
    setValuePackage('All');
    if (look !== true) {
      if (props.type === 'payment') {
        Promise.all([dispatch(fetchAllOrder(pageNum))]);
      }
    } else {
      if (props.type === 'payment') {
        Promise.all([
          dispatch(
            fetchAllOrderLook({
              pageNum: 1,
              valuePackage: textPackage,
              textLook: textSearch,
            }),
          ),
        ]);
      } else {
      }
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [location.search, props.type, dispatch, page, textSearch, textPackage]);

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const getPage = () => {
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
    return pageNum;
  };

  const handleOnChangePage = (page, size) => {
    setPage(page);
    navigate('/' + props.type + '?page=' + page);
  };

  const onChangeLook = () => {
    console.log(textLook);
    console.log(valuePackage);
    setPage(1);
    navigate('/' + props.type + '?page=1', {
      state: {
        look: true,
        textSearch: textLook,
        textPackage: valuePackage,
      },
    });
  };

  if (loading || !dataPayment) {
    return (
      <DivPayment>
        <LoadingComponent />
      </DivPayment>
    );
  }

  return (
    <DivPayment>
      <DivAddDataPayment>
        {userInfo.role === 'superAdmin' && (
          <DivAction>
            <div>
              <Button type="primary">Add</Button>
            </div>
            <div>
              <LookInfo
                onChangeLook={onChangeLook}
                dataPayment={dataPayment}
                filterOption={filterOption}
                setValuePackage={setValuePackage}
                setTextLook={setTextLook}
                textLook={textLook}
                valuePackage={valuePackage}
                type={props.type}
              />
            </div>
          </DivAction>
        )}
      </DivAddDataPayment>
      <DivTable>
        <TableAssets data={data} dataTable={dataTable} type={props.type} />
      </DivTable>
      {data.length > 0 && (
        <DivPagination>
          <PaginationComponent
            count={count}
            page={page}
            handleOnChangePage={handleOnChangePage}
          />
        </DivPagination>
      )}
    </DivPayment>
  );
}

export default PaymentAndPackagePage;
