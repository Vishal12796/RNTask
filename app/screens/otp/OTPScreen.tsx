import {useNavigation} from '@react-navigation/native';
import {unwrapResult} from '@reduxjs/toolkit';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {generateOTP} from '../../api/apiCall';
import {Button} from '../../components/Button';
import {InputText} from '../../components/InputText';
import {useAppDispatch} from '../../redux/store';
import {validatePhoneNumber} from '../../utils/helper';
import {strings} from '../../utils/string';
import {styles} from './Styles';
import {screenName} from '../../navigation/screenNames';

export const OTPScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [mobNumber, setMobNumber] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<{num: number; text: string}>({
    num: 91,
    text: 'IN',
  });

  const onSelect = (country: Country) => {
    setCountryCode({
      // eslint-disable-next-line radix
      num: parseInt(country.callingCode[0]),
      text: country.cca2,
    });
  };

  const onSendPress = () => {
    if (mobNumber.length == 0) {
      Alert.alert(strings.pleaseEnterMobile);
    } else if (!validatePhoneNumber(mobNumber)) {
      Alert.alert(strings.validMobile);
    } else {
      setLoader(true);
      dispatch(
        generateOTP({
          contact_number: mobNumber,
          country_code: `+${countryCode.num}`,
        }),
      )
        .then(unwrapResult)
        .then(data => {
          setLoader(false);
          navigation.navigate(screenName.LOGIN_SCREEN, {
            mobNumber,
            countryCode: countryCode.num,
            otp: data?.data?.otp,
          });
        })
        .catch(_e => {
          setLoader(false);
        });
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.countryContainer}>
        <View style={styles.countryCodeView}>
          <CountryPicker
            countryCodes={['US', 'CA', 'IN']}
            countryCode={countryCode.text}
            onSelect={onSelect}
            withFlagButton={true}
            withCallingCodeButton={true}
            withCallingCode={true}
          />
        </View>

        <InputText
          value={mobNumber}
          onChangeText={setMobNumber}
          placeholder={strings.enterMobileNumber}
          maxLength={10}
          placeholderColor={Colors.black}
          style={styles.mobNumStyles}
          keyboardType="number-pad"
        />
      </View>

      <Button text={strings.sendOTP} onPress={onSendPress} loading={loader} />
    </View>
  );
};
