import React, { useContext, useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import dayjs from 'dayjs';
import FormAddModal from '../FormAddModal';
import FormModalContext from '../../contexts/FormModalContext';

function ModalAdd(props) {
  const { type, dataRecord } = useContext(FormModalContext);

  const [datePicker, setDatePicker] = useState(
    dataRecord !== undefined && dataRecord.releaseDate
      ? dataRecord.releaseDate
      : dayjs().format('YYYY-MM-DD'),
  );
  const [options, setOptions] = useState(undefined);

  const [form] = Form.useForm();

  useEffect(() => {
    if (type === 'movies' || type === 'series') {
      form.setFieldsValue({
        releaseDate: dayjs(datePicker, 'YYYY-MM-DD'),
      });
    }
    switch (type) {
      case 'series':
        if (dataRecord) {
          form.setFieldsValue({
            title: dataRecord.title,
            description: dataRecord.description,
            listSeriesId:
              dataRecord.listSeriesId.length > 0
                ? dataRecord.listSeriesId
                : 'none',
          });
        } else {
          form.setFieldsValue({
            listSeriesId: 'none',
          });
        }
        break;
      case 'movies':
        if (dataRecord) {
          form.setFieldsValue({
            title: dataRecord.title,
            description: dataRecord.description,
            director: dataRecord.director,
            cast: dataRecord.cast,
            country: dataRecord.country,
            productCompany: dataRecord.productCompany,
            listCategoryId: dataRecord.listCategoryId,
          });
        }
        break;
      case 'category':
        if (dataRecord && dataRecord.name) {
          form.setFieldsValue({ name: dataRecord.name });
        }
        break;
      default:
        break;
    }
  }, [dataRecord, type, props.isModal]);

  useEffect(() => {
    if (type === 'series') {
      let newOptions;
      newOptions = props.dataFilm.map((item) => ({
        label: item.title,
        value: item._id,
      }));
      setTimeout(() => {
        setOptions(newOptions);
      }, 10);
    }
  }, [props.dataFilm]);

  useEffect(() => {
    if (type === 'movies') {
      let newOptions;
      newOptions = props.dataCategory.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setTimeout(() => {
        setOptions(newOptions);
      }, 10);
    }
  }, [props.dataCategory]);

  const handleCancel = () => {
    props.setIsModal(false);
    props.setDataRecord(undefined);
    form.resetFields();
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

  return (
    <Modal
      title={dataRecord !== undefined ? `Update ${type}` : `Add ${type}`}
      open={props.isModal}
      onCancel={handleCancel}
      footer={null}>
      <FormAddModal
        handleCancel={handleCancel}
        options={options}
        form={form}
        handleOnchange={handleOnchange}
      />
    </Modal>
  );
}

export default ModalAdd;
