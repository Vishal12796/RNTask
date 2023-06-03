import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {HomeScreen} from '../screens/home/HomeScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {EditProfileScreen} from '../screens/profile/editProfile/EditProfileScreen';
import {screenName} from './screenNames';
import {strings} from '../utils/string';

const Drawer = createDrawerNavigator();

export const PostLogin: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={screenName.HOME_SCREEN}
        component={HomeScreen}
        options={{title: strings.home, headerShown: false}}
      />
      <Drawer.Screen
        name={screenName.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{title: strings.profile}}
      />
      <Drawer.Screen
        name={screenName.EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
        options={{title: strings.editProfile}}
      />
    </Drawer.Navigator>
  );
};
