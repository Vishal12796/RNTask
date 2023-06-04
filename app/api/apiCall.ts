import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosParams, useAxios} from './useAxios';
import {API_TYPE, ENDPOINTS} from './apiConst';
import {RequestLoginParams, RequestOTP} from '../types/type';

export const generateOTP = createAsyncThunk(
  'generateOTP',
  async (data: RequestOTP) => {
    const dataRequest: AxiosParams = {
      method: API_TYPE.post,
      endpoint: ENDPOINTS.generateOTP,
      data: data,
    };
    const response = await useAxios(dataRequest);
    return response;
  },
);

export const loginApi = createAsyncThunk(
  'loginApi',
  async (data: RequestLoginParams) => {
    const dataRequest: AxiosParams = {
      method: API_TYPE.post,
      endpoint: ENDPOINTS.login,
      data: data,
    };
    const response = await useAxios(dataRequest);
    return response;
  },
);

export const homeApi = createAsyncThunk('homeApi', async () => {
  const dataRequest: AxiosParams = {
    method: API_TYPE.post,
    endpoint: ENDPOINTS.home,
  };
  const response = await useAxios(dataRequest);
  return response;
});
