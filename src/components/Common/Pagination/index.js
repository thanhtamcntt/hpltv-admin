import { Pagination } from 'antd';

function PaginationComponent(props) {
  return (
    <Pagination
      current={props.page}
      total={props.count}
      showSizeChanger={false}
      showQuickJumper
      defaultPageSize={5}
      onChange={props.handleOnChangePage}
    />
  );
}

export default PaginationComponent;
