import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import {Platform, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  PermissionStatus,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';
import {
  readUserData,
  removeUserReadListener,
} from '../../firebase/firebaseHelper';
import {updateReduxUserData} from '../../redux/reducerSlice/auth';
import {RootState, useAppDispatch, useAppSelector} from '../../redux/store';
import {UserDetails} from '../../types/type';
import {strings} from '../../utils/string';
import {styles} from './Styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export const ProfileScreen: React.FC = () => {
  const userData = useAppSelector((state: RootState) => state.auth.userData);
  const dispatch = useAppDispatch();
  const map: LegacyRef<MapView> = useRef(null);
  const [user, setUser] = useState<UserDetails>(userData);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    locationPer();

    if (userData?.user_id) {
      readUserData(userData?.user_id, firebaseData => {
        if (firebaseData) {
          setUser(firebaseData);
          dispatch(updateReduxUserData({...firebaseData}));
        }
      });
    }

    return () => {
      removeUserReadListener(userData?.user_id);
    };
  }, []);

  const locationPer = async () => {
    let status: PermissionStatus = RESULTS.UNAVAILABLE;

    const locationPermission = await check(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );
    status = locationPermission;

    if (locationPermission === RESULTS.UNAVAILABLE) {
      console.log('UNAVAILABLE');
    } else if (locationPermission === RESULTS.DENIED) {
      console.log('locationPermission: ', locationPermission);
      const newLocPermission = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      status = newLocPermission;
      if (
        newLocPermission === RESULTS.DENIED ||
        newLocPermission === RESULTS.BLOCKED
      ) {
        console.log('Denied or Block : ', newLocPermission);
      }
    } else if (locationPermission === RESULTS.BLOCKED) {
      console.log('BLOCKED');
    }

    if (status === RESULTS.GRANTED) {
      getOneTimeLocation();
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        try {
          const currentLongitude =
            position?.coords?.longitude?.toFixed(6) || 0.0;
          const currentLatitude = position?.coords?.latitude?.toFixed(6) || 0.0;
          console.log(
            'Location : ',
            `LAT:${currentLatitude} LONG:${currentLongitude}`,
          );
          setLocation({
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          });
          map?.current.animateToRegion({
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        } catch (e) {}
      },
      err => console.log('Error', err),
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.viewMap}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          ref={map}
          showsUserLocation={true}>
          {location ? (
            <Marker
              coordinate={location}
              title={strings.currentLocation}
              description={strings.currentLocationDesc}
            />
          ) : (
            <></>
          )}
        </MapView>
      </View>
      <Text style={styles.labelText}>{strings.firstName}</Text>
      <Text style={styles.dataText}>{user?.first_name}</Text>

      <Text style={styles.labelText}>{strings.lastName}</Text>
      <Text style={styles.dataText}>{user?.last_name}</Text>

      <Text style={styles.labelText}>{strings.email}</Text>
      <Text style={styles.dataText}>{user?.email}</Text>

      <Text style={styles.labelText}>{strings.mobileNumber}</Text>
      <Text style={styles.dataText}>{user?.contact_number}</Text>
    </View>
  );
};
