import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {screenName} from '../../navigation/screenNames';
import {RootState, useAppSelector} from '../../redux/store';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const userData = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userData?.userData?.user_id) {
      navigation.dispatch(StackActions.replace(screenName.POST_LOGIN));
    } else {
      navigation.dispatch(StackActions.replace(screenName.PRE_LOGIN));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return <></>;
};
