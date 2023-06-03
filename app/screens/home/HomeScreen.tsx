import React, {useEffect} from 'react';
import {View} from 'react-native';
import {homeApi} from '../../api/apiCall';
import {useAppDispatch} from '../../redux/store';
import {CompanyData} from './CompanyData';
import {HeaderView} from './HeaderView';
import {styles} from './Styles';

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(homeApi());
  }, []);

  return (
    <View style={styles.root}>
      <HeaderView />

      <CompanyData />
    </View>
  );
};
