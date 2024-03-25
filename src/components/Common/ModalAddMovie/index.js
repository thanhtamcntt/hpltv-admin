import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  Upload,
  notification,
  Select,
} from 'antd';
import ItemForm from '../../../layout/ItemForm';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  createMovies,
  updateMovies,
} from '../../../redux/Action/Assets/movies';
import dayjs from 'dayjs';

function ModalAddMovies(props) {
  const [datePicker, setDatePicker] = useState(
    props.dataRecord !== undefined
      ? props.dataRecord.releaseDate
      : dayjs().format('YYYY-MM-DD'),
  );
  const [options, setOptions] = useState(undefined);

  const openNotification = (placement, message) => {
    notification.error({
      message: `Notification Error`,
      description: message,
      placement,
    });
  };

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCancel = () => {
    props.setIsModalMovies(false);
    props.setDataRecord(undefined);
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log('values', values);
    if (
      values.imageUrl.file.type !== 'image/jpeg' &&
      values.imageUrl.file.type !== 'image/jpg' &&
      values.imageUrl.file.type !== 'image/png'
    ) {
      openNotification('top', 'Invalid image type!!');
      return;
    }

    if (values.videoUrl.file.type !== 'video/mp4') {
      openNotification('top', 'Invalid video type!!');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('imageUrl', values.imageUrl.file);
    formData.append('videoUrl', values.videoUrl.file);
    formData.append('releaseDate', values.releaseDate.format('YYYY-MM-DD'));
    formData.append('director', values.director);
    formData.append('cast', values.cast);
    formData.append('country', values.country);
    formData.append('productCompany', values.productCompany);
    formData.append('listCategoryId', values.listCategoryId);

    try {
      if (props.dataRecord !== undefined) {
        const data = {
          formData: formData,
          Id: props.dataRecord._id,
        };
        await dispatch(updateMovies(data));
        props.setIsModalMovies(false);
      } else {
        await dispatch(createMovies(formData));
        props.setIsModalMovies(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({
      releaseDate: dayjs(datePicker, 'YYYY-MM-DD'),
    });
    if (props.dataRecord) {
      form.setFieldsValue({
        title: props.dataRecord.title,
        description: props.dataRecord.description,
        director: props.dataRecord.director,
        cast: props.dataRecord.cast,
        country: props.dataRecord.country,
        productCompany: props.dataRecord.productCompany,
        listCategoryId: props.dataRecord.listCategoryId,
      });
    }
  }, [props.dataRecord]);

  useEffect(() => {
    let newOptions;
    newOptions = props.dataCategory.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    setTimeout(() => {
      setOptions(newOptions);
    }, 10);
  }, []);

  return (
    <Modal
      title={props.dataRecord !== undefined ? 'Update movies' : 'Add movies'}
      open={props.isModalMovies}
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
          label="Name Movies"
          name="title"
          message="Please input your name movies!"
          input={<Input />}
        />

        <ItemForm
          label="Description"
          name="description"
          message="Please input your description!"
          input={<Input />}
        />

        <ItemForm
          label="Image Film Url"
          name="imageUrl"
          message="Please input your image url!"
          input={
            <Upload
              beforeUpload={(file) => {
                return false;
              }}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          }
        />

        <ItemForm
          label="Video Film Url"
          name="videoUrl"
          message="Please input your video url!"
          input={
            <Upload
              beforeUpload={(file) => {
                return false;
              }}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          }
        />

        <ItemForm
          label="Release Date"
          name="releaseDate"
          message="Please input your release date!"
          input={<DatePicker format={'YYYY-MM-DD'} />}
        />

        <ItemForm
          label="Director"
          name="director"
          message="Please input your director!"
          input={<Input />}
        />

        <ItemForm
          label="Cast"
          name="cast"
          message="Please input your cast!"
          initialValue={
            props.dataRecord !== undefined ? props.dataRecord.cast : ''
          }
          input={<Input />}
        />

        <ItemForm
          label="Country"
          name="country"
          message="Please input your country!"
          input={<Input />}
        />

        <ItemForm
          label="Product Company"
          name="productCompany"
          message="Please input your product company!"
          input={<Input />}
        />

        <ItemForm
          label="Film for category"
          name="listCategoryId"
          message="Please select your film for category!"
          input={
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              options={options}
            />
          }
        />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          className="add-film-button">
          <Button htmlType="submit">
            {!props.dataRecord !== undefined ? 'Update Movies' : 'Add Movies'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAddMovies;
