import database from '@react-native-firebase/database';
import {UserDetails} from '../types/type';

export const dbReference = database();
export const USERS = 'Users';

export const addUserData = async (userData: UserDetails) => {
  await dbReference.ref(USERS).push(userData);
};

export const updateUserData = async (
  userKey: string,
  userData: UserDetails,
) => {
  await dbReference.ref(`${USERS}/${userKey}`).update(userData);
};

export const findUserData = async (
  userData: UserDetails,
  dataCallback: (data: any) => void,
) => {
  await dbReference
    .ref(USERS)
    .orderByChild('user_id')
    .equalTo(userData?.user_id)
    .once('value', (data: any) => {
      dataCallback(extractKey(data.val()));
    });
};

const extractKey = (data: any) => {
  if (data) {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const fbKey = keys[0];
      return {...data[fbKey], key: fbKey};
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const readUserData = (
  user_id: number,
  dataCallback: (data: any) => void,
) => {
  dbReference
    .ref(USERS)
    .orderByChild('user_id')
    .equalTo(user_id)
    .on('value', (data: any) => {
      dataCallback(extractKey(data.val()));
    });
};

export const removeUserReadListener = (user_id: number) => {
  dbReference
    .ref(USERS)
    .orderByChild('user_id')
    .equalTo(user_id)
    .off('value', () => {});
};
