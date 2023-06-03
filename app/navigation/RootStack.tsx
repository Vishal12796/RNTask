import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {SplashScreen} from '../screens/splash/SplashScreen';
import {PostLogin} from './PostLogin';
import {PreLogin} from './PreLogin';
import {screenName} from './screenNames';

const Stack = createNativeStackNavigator();

export const RootStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenName.SPLASH_SCREEN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={screenName.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen name={screenName.PRE_LOGIN} component={PreLogin} />
        <Stack.Screen name={screenName.POST_LOGIN} component={PostLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
