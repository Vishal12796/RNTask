import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppImages} from '../../assets/images';
import {Button} from '../../components/Button';
import {screenName} from '../../navigation/screenNames';
import {removeAuthData} from '../../redux/reducerSlice/auth';
import {removeHomeData} from '../../redux/reducerSlice/home';
import {useAppDispatch} from '../../redux/store';
import {Colors} from '../../utils/colors';
import {strings} from '../../utils/string';
import {List} from './List';

export const CompanyData: React.FC = () => {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();

  const onLogoutPress = async () => {
    await AsyncStorage.removeItem('authToken');

    appDispatch(removeAuthData());
    appDispatch(removeHomeData());

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: screenName.PRE_LOGIN,
          },
        ],
      }),
    );
  };

  return (
    <View style={styles.dataView}>
      <View style={styles.infoView}>
        <View style={styles.imgView}>
          <Image source={AppImages.tempImg} style={styles.imgStyle} />
        </View>
      </View>
      <Text style={styles.companyName}>ABC Company Ltd</Text>
      <Text style={styles.companyDesc}>The Hearist Tower</Text>

      <List />
      <View style={styles.buttonContainer}>
        <Button text={strings.logout} onPress={onLogoutPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dataView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    flex: 2,
    marginTop: -35,
  },
  infoView: {
    alignItems: 'center',
  },
  imgView: {
    backgroundColor: Colors.white,
    height: 90,
    width: 90,
    marginTop: -45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
  },
  imgStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  companyName: {
    marginTop: 10,
    fontSize: 24,
    color: Colors.black,
    fontWeight: '800',
    textAlign: 'center',
  },
  companyDesc: {
    fontSize: 16,
    color: Colors.grey,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
});
