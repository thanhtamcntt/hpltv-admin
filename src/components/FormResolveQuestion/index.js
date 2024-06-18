import { Button, Form, Input } from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { useDispatch } from 'react-redux';
import { Title, Description } from './styles';
import FormModalContext from '../../contexts/FormModalContext';
import { useContext } from 'react';
import { resolveCustomerQuestions } from '../../redux/Action/Setting/customerQuestion';

function FormResolveQuestion(props) {
  const dispatch = useDispatch();

  const { type, dataRecord } = useContext(FormModalContext);

  const onFinish = async (values) => {
    let dataBody;

    dataBody = {
      explanation: values.explanation,
      description: values.description,
    };
    await dispatch(resolveCustomerQuestions(dataBody));
    props.handleCancel();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Title>Title question: {dataRecord && dataRecord.title}</Title>
      <Description>
        Description detail: {dataRecord && dataRecord.description}
      </Description>
      <Form
        form={props.form}
        name={'Explanation form'}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <ItemForm
          label="Explanation"
          name="explanation"
          message="Please input explanation!"
          input={<Input />}
        />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          className="add-film-button">
          <Button htmlType="submit">{'Send'}</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormResolveQuestion;
