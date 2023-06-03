import axios from 'axios';
import {API_URL} from './apiConst';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AxiosParams = {
  endpoint: string;
  method: string;
  data?: any;
};

export const useAxios = async (axiosParams: AxiosParams) => {
  const token = await AsyncStorage.getItem('authToken');

  return new Promise((resolve, reject) => {
    let requestParams = {
      ...axiosParams,
      url: `${API_URL}${axiosParams?.endpoint}`,
    };

    if (token) {
      requestParams = {
        ...requestParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    axios
      .request(requestParams)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err?.message);
        Alert.alert('Error : ', err?.message);
      });
  });
};
