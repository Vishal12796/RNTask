import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {Button} from '../../../components/Button';
import {InputText} from '../../../components/InputText';
import {
  findUserData,
  readUserData,
  removeUserReadListener,
  updateUserData,
} from '../../../firebase/firebaseHelper';
import {RootState, useAppDispatch, useAppSelector} from '../../../redux/store';
import {UserDetails} from '../../../types/type';
import {Colors} from '../../../utils/colors';
import {emailRegex, validatePhoneNumber} from '../../../utils/helper';
import {strings} from '../../../utils/string';
import {styles} from '../Styles';
import {updateReduxUserData} from '../../../redux/reducerSlice/auth';

export const EditProfileScreen: React.FC = () => {
  const userData = useAppSelector((state: RootState) => state.auth.userData);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<UserDetails>(userData);

  useEffect(() => {
    findUserData(userData?.user_id, firebaseData => {
      if (firebaseData) {
        setUser(firebaseData);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateData = () => {
    if (user?.key) {
      updateUserData(user?.key, {...user});
      dispatch(updateReduxUserData({...user}));
    }
  };

  const onUpdatePress = () => {
    if (user?.first_name.trim().length === 0) {
      Alert.alert(strings.pleaseEnterFirstName);
    } else if (user?.last_name.trim().length === 0) {
      Alert.alert(strings.pleaseEnterLastName);
    } else if (user?.email.trim().length === 0) {
      Alert.alert(strings.pleaseEnterEmail);
    } else if (!emailRegex.test(user?.email)) {
      Alert.alert(strings.pleaseEnterValidEmail);
    } else if (`${user?.contact_number}`.trim().length === 0) {
      Alert.alert(strings.pleaseEnterMobile);
    } else if (!validatePhoneNumber(`${user?.contact_number}`)) {
      Alert.alert(strings.validMobile);
    } else {
      updateData();
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.labelText}>{strings.firstName}</Text>
      <InputText
        value={user?.first_name}
        onChangeText={text => {
          setUser({...user, first_name: text});
        }}
        placeholder={strings.enterFirstName}
        placeholderColor={Colors.black}
        style={styles.inputStyle}
      />

      <Text style={styles.labelText}>{strings.lastName}</Text>
      <InputText
        value={user?.last_name}
        onChangeText={text => {
          setUser({...user, last_name: text});
        }}
        placeholder={strings.enterLastName}
        placeholderColor={Colors.black}
        style={styles.inputStyle}
      />

      <Text style={styles.labelText}>{strings.email}</Text>
      <InputText
        value={user?.email}
        onChangeText={text => {
          setUser({...user, email: text});
        }}
        placeholder={strings.enterEmail}
        placeholderColor={Colors.black}
        style={styles.inputStyle}
      />

      <Text style={styles.labelText}>{strings.mobileNumber}</Text>
      <InputText
        value={user?.contact_number}
        onChangeText={text => {
          // eslint-disable-next-line radix
          setUser({...user, contact_number: text});
        }}
        placeholder={strings.enterMobileNumber}
        placeholderColor={Colors.black}
        style={styles.inputStyle}
        keyboardType="number-pad"
      />

      <Button text={strings.update} onPress={onUpdatePress} />
    </View>
  );
};
