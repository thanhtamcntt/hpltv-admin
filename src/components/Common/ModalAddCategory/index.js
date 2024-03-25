import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import ItemForm from '../../../layout/ItemForm';
import { useDispatch } from 'react-redux';
import {
  createCategory,
  updateCategory,
} from '../../../redux/Action/Setting/category';

function ModalAddCategory(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCancel = () => {
    props.setIsModalCategory(false);
    props.setDataRecord(undefined);
    form.resetFields();
  };

  useEffect(() => {
    if (props.dataRecord && props.dataRecord.name) {
      console.log(props.dataRecord.name);
      form.setFieldsValue({ name: props.dataRecord.name });
    }
  }, [props.dataRecord]);

  const onFinish = async (values) => {
    const dataBody = {
      name: values.name,
    };
    try {
      if (props.dataRecord !== undefined) {
        const data = {
          formData: dataBody,
          Id: props.dataRecord._id,
        };
        await dispatch(updateCategory(data));
        props.setIsModalCategory(false);
      } else {
        await dispatch(createCategory(dataBody));
        props.setIsModalCategory(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={
        props.dataRecord !== undefined ? 'Update category' : 'Add category'
      }
      open={props.isModalCategory}
      onCancel={handleCancel}
      footer={null}>
      <Form
        form={form}
        name="FilmForm"
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
          label="Name Category"
          name="name"
          message="Please input your name category!"
          input={<Input />}
        />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          className="add-film-button">
          <Button htmlType="submit">
            {props.dataRecord !== undefined
              ? 'Update Category'
              : 'Add Category'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAddCategory;
