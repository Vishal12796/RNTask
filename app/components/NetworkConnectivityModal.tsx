import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CenterDialog} from './CenterDialog';
import {Colors} from '../utils/colors';

export const NetworkConnectivityModal = () => {
  const {isInternetReachable, isConnected} = useNetInfo();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      typeof isInternetReachable === 'boolean' &&
      typeof isConnected === 'boolean'
    ) {
      if (!isInternetReachable || !isConnected) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [isInternetReachable, isConnected]);

  return (
    <CenterDialog visible={isVisible} onClose={() => setIsVisible(false)}>
      <View style={styles.networkPromptContainer}>
        <Text style={styles.lgTxt}>You are offline</Text>
        <Text style={styles.smTxt}>
          Please make sure you are connected to the internet and try again.
        </Text>
      </View>
    </CenterDialog>
  );
};

const styles = StyleSheet.create({
  lgTxt: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.005,
    textAlign: 'center',
    color: Colors.black,
    marginBottom: 12,
  },
  smTxt: {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.07,
    color: Colors.black,
    textAlign: 'center',
  },
  modalStyle: {flex: 1},
  networkPromptContainer: {
    paddingVertical: 10,
  },
});
