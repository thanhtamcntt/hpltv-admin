import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  notification,
  Upload,
  Select,
} from 'antd';
import ItemForm from '../../../layout/ItemForm';
import dayjs from 'dayjs';
import {
  createSeries,
  updateSeries,
} from '../../../redux/Action/Assets/series';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

function ModalAddSeries(props) {
  const [form] = Form.useForm();
  const [datePicker, setDatePicker] = useState(
    props.dataRecord !== undefined
      ? props.dataRecord.releaseDate
      : dayjs().format('YYYY-MM-DD'),
  );
  const [options, setOptions] = useState(undefined);

  const dispatch = useDispatch();
  useEffect(() => {
    let newOptions;
    newOptions = props.dataFilm.map((item) => ({
      label: item.title,
      value: item._id,
    }));
    setTimeout(() => {
      setOptions(newOptions);
    }, 10);
  }, []);

  const handleCancel = () => {
    props.setIsModalSeries(false);
    props.setDataRecord(undefined);
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log('Success:', values);

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('imageUrl', values.imageUrl.file);
    formData.append('listSeriesId', values.listSeriesId);

    try {
      if (props.dataRecord !== undefined) {
        const data = {
          formData: formData,
          Id: props.dataRecord._id,
        };
        await dispatch(updateSeries(data));
        handleCancel();
      } else {
        await dispatch(createSeries(formData));
        handleCancel();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnchange = (value) => {
    const lengthValue = value.filter((val) => val !== 'none');
    if (lengthValue.length < 1) {
      form.setFieldsValue({
        listSeriesId: 'none',
      });
    } else {
      form.setFieldsValue({
        listSeriesId: value.filter((val) => val !== 'none'),
      });
    }
  };

  useEffect(() => {
    console.log(props.dataRecord);
    if (props.dataRecord) {
      form.setFieldsValue({
        title: props.dataRecord.title,
        description: props.dataRecord.description,
        listSeriesId:
          props.dataRecord.listSeriesId.length > 0
            ? props.dataRecord.listSeriesId
            : 'none',
      });
    } else {
      form.setFieldsValue({
        listSeriesId: 'none',
      });
    }
  }, [props.dataRecord]);

  return (
    <Modal
      title={props.dataRecord ? 'Update Series' : 'Add Series'}
      open={props.isModalSeries}
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
          label="Name Series"
          name="title"
          message="Please input your name series!"
          input={<Input />}
        />

        <ItemForm
          label="Description"
          name="description"
          message="Please input your description!"
          input={<Input />}
        />

        <ItemForm
          label="Image Series Url"
          name="imageUrl"
          message="Please input your image url!"
          input={
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                return false;
              }}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          }
        />

        <ItemForm
          label="Film for series"
          name="listSeriesId"
          message="Please select your film for series!"
          required={false}
          input={
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              options={options}
              onChange={handleOnchange}
            />
          }
        />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          className="add-film-button">
          <Button htmlType="submit">
            {props.dataRecord !== undefined ? 'Update Series' : 'Add Series'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAddSeries;
