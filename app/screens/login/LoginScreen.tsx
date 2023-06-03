import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {unwrapResult} from '@reduxjs/toolkit';
import React, {useState} from 'react';
import {Alert, Platform, View} from 'react-native';
import {loginApi} from '../../api/apiCall';
import {API_CODE} from '../../api/apiConst';
import {Button} from '../../components/Button';
import {InputText} from '../../components/InputText';
import {screenName} from '../../navigation/screenNames';
import {useAppDispatch} from '../../redux/store';
import {Colors} from '../../utils/colors';
import {strings} from '../../utils/string';
import {styles} from './Styles';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const params = useRoute()?.params;
  const [otpNum, setOTPNum] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const callLoginApi = () => {
    setLoader(true);
    dispatch(
      loginApi({
        contact_number: params?.mobNumber,
        country_code: params?.countryCode,
        device_token: 1234,
        otp: otpNum,
        device_type: Platform.OS,
      }),
    )
      .then(unwrapResult)
      .then(async data => {
        setLoader(false);
        if (data?.status === API_CODE.SUCCESS) {
          await AsyncStorage.setItem('authToken', data?.access_token);
          navigation.dispatch(StackActions.replace(screenName.POST_LOGIN));
        } else {
          Alert.alert(data?.message);
        }
      })
      .catch(e => {
        setLoader(false);
        console.log('Err response from func:', e);
      });
  };

  const onLoginPress = () => {
    if (otpNum.length === 0) {
      Alert.alert(strings.pleaseEnterOTP);
    } else if (otpNum.trim().length < 4) {
      Alert.alert(strings.validOTP);
    } else {
      callLoginApi();
    }
  };

  return (
    <View style={styles.root}>
      <InputText
        value={otpNum}
        onChangeText={setOTPNum}
        placeholder={strings.enterOTP}
        maxLength={4}
        placeholderColor={Colors.black}
        style={styles.otpStyles}
        keyboardType="number-pad"
      />
      <Button text={strings.login} onPress={onLoginPress} loading={loader} />
    </View>
  );
};
