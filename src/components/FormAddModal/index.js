import {
  Button,
  Form,
  Input,
  DatePicker,
  Upload,
  Select,
  notification,
} from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { createMovies, updateMovies } from '../../redux/Action/Assets/movies';
import {
  createCategory,
  updateCategory,
} from '../../redux/Action/Setting/category';
import { createSeries, updateSeries } from '../../redux/Action/Assets/series';
import FormModalContext from '../../contexts/FormModalContext';
import { useContext, } from 'react';

function FormAddModal(props) {
  const dispatch = useDispatch();

  const { type, dataRecord } = useContext(FormModalContext);


  const openNotification = (placement, message) => {
    notification.error({
      message: `Notification Error`,
      description: message,
      placement,
    });
  };

  const onFinish = async (values) => {
    console.log('values', values);
    if (type === 'movies') {
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
    }
    let formData = new FormData();
    let dataBody;
    switch (type) {
      case 'series':
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('imageUrl', values.imageUrl.file);
        formData.append('listSeriesId', values.listSeriesId);
        break;
      case 'movies':
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
        break;
      case 'category':
        dataBody = {
          name: values.name,
        };
        break;
      default:
        break;
    }

    try {
      if (dataRecord !== undefined) {
        let data;

        switch (type) {
          case 'series':
            data = {
              formData: formData,
              Id: dataRecord._id,
            };
            dispatch(updateSeries(data));
            props.handleCancel();
            break;
          case 'movies':
            data = {
              formData: formData,
              Id: dataRecord._id,
            };
            dispatch(updateMovies(data));
            props.handleCancel();
            break;
          case 'category':
            data = {
              formData: dataBody,
              Id: dataRecord._id,
            };
            dispatch(updateCategory(data));
            props.handleCancel();
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case 'series':
            dispatch(createSeries(formData));
            props.handleCancel();
            break;
          case 'movies':
            dispatch(createMovies(formData));
            props.handleCancel();
            break;
          case 'category':
            dispatch(createCategory(dataBody));
            props.handleCancel();
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={props.form}
      name={type + 'Form'}
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
        label={'Name ' + (type.charAt(0).toUpperCase() + type.slice(1))}
        name={(type === 'category' && 'name') || 'title'}
        message={`Please input your name ${type}!`}
        input={<Input />}
      />

      {(type === 'series' || type === 'movies') && (
        <>
          <ItemForm
            label="Description"
            name="description"
            message="Please input your description!"
            input={<Input />}
          />

          <ItemForm
            label={`Image ${type.charAt(0).toUpperCase() + type.slice(1)} Url`}
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
        </>
      )}

      {type === 'movies' && (
        <>
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
            initialValue={dataRecord !== undefined ? dataRecord.cast : ''}
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
                options={props.options}
              />
            }
          />
        </>
      )}

      {type === 'series' && (
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
              options={props.options}
              onChange={props.handleOnchange}
            />
          }
        />
      )}

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
        className="add-film-button">
        <Button htmlType="submit">
          {dataRecord !== undefined
            ? `Update ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormAddModal;
