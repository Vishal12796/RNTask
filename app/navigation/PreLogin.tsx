import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from '../screens/login/LoginScreen';
import {OTPScreen} from '../screens/otp/OTPScreen';
import {screenName} from './screenNames';
import {strings} from '../utils/string';

const Stack = createNativeStackNavigator();

export const PreLogin = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name={screenName.OTP_SCREEN}
        options={{title: strings.mobileInfo}}
        component={OTPScreen}
      />
      <Stack.Screen
        name={screenName.LOGIN_SCREEN}
        options={{title: strings.login}}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};
