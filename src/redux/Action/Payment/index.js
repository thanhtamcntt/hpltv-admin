import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllOrder = createAsyncThunk(
  'fetchAllOrder',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_GET_DATA_PAYMENT +
        '/from-page?limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        size,
    );
    const data = await response.json();
    console.log(data);
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchAllOrderLook = createAsyncThunk(
  'fetchAllOrderLook',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(
      process.env.REACT_APP_API_GET_DATA_PAYMENT +
        '/fetch-look?trash=false&package=' +
        data.valuePackage +
        '&name=' +
        data.textLook +
        '&limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        data.pageNum,
    );
    const dataJson = await response.json();
    if (!dataJson.success) {
      rejectWithValue(dataJson);
    }
    return dataJson;
  },
);
