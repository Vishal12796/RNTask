import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppImages} from '../../assets/images';
import {useAppSelector} from '../../redux/store';
import {AppIcons} from '../../assets/icons';
import {strings} from '../../utils/string';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/colors';
import {UserDetails} from '../../types/type';

export const HeaderView: React.FC = () => {
  const navigation = useNavigation();
  const useData = useAppSelector(state => state.auth);
  const [user, setUser] = useState<UserDetails>(useData?.userData);

  const drawerClick = () => {
    navigation.toggleDrawer();
  };

  useEffect(() => {
    setUser(useData?.userData);
  }, [useData]);

  return (
    <ImageBackground
      style={styles.imgBg}
      source={AppImages.tempImg}
      resizeMethod="resize"
      resizeMode="cover">
      <View style={styles.container}>
        <TouchableOpacity
          onPress={drawerClick}
          activeOpacity={0.8}
          style={styles.imgClick}>
          <Image source={AppIcons.menu} style={styles.menuImg} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.lgText}>
            {`${strings.welcome}, ${user?.first_name}`}
          </Text>
          <Text style={styles.smText}>{user?.type}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBg: {
    width: '100%',
    flex: 1,
  },

  container: {
    paddingHorizontal: 6,
  },
  imgClick: {
    height: 40,
    width: 40,
  },
  menuImg: {
    height: 40,
    width: 40,
    tintColor: Colors.white,
  },
  infoContainer: {
    marginHorizontal: 8,
  },
  lgText: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: '700',
  },
  smText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '500',
  },
});
