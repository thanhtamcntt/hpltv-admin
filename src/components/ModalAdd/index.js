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
      : dayjs().format('YYYY'),
  );
  const [options, setOptions] = useState(undefined);

  const [form] = Form.useForm();

  useEffect(() => {
    if (type === 'movies' || type === 'series') {
      form.setFieldsValue({
        releaseDate: dayjs(datePicker, 'YYYY'),
      });
    }
    switch (type) {
      case 'series':
        if (dataRecord) {
          form.setFieldsValue({
            title: dataRecord.title,
            description: dataRecord.description,
            director: dataRecord.director,
            cast: dataRecord.cast,
            country: dataRecord.country,
            listCategoryId: dataRecord.listCategoryId,
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
    const fetchCategory = async () => {
      const response = await fetch(process.env.REACT_APP_API_CATEGORY);
      const data = await response.json();
      if (data.success) {
        let newOptions = [];
        Promise.all(
          data.data.map((item) =>
            newOptions.push({
              label: item.name,
              value: item._id,
            }),
          ),
        );
        setOptions(newOptions);
      }
    };
    if (type === 'movies' || type === 'series') {
      fetchCategory();
    }
  }, [type]);

  const handleCancel = () => {
    props.setIsModal(false);
    props.setDataRecord(undefined);
    form.resetFields();
  };

  return (
    <Modal
      title={dataRecord !== undefined ? `Update ${type}` : `Add ${type}`}
      open={props.isModal}
      onCancel={handleCancel}
      footer={null}>
      <FormAddModal handleCancel={handleCancel} options={options} form={form} />
    </Modal>
  );
}

export default ModalAdd;
