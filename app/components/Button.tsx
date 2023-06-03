import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../utils/colors';

interface ButtonProps {
  onPress: () => void;
  text: string;
  testID?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = props => {
  const {onPress, text, testID, loading = false} = props;

  return (
    <TouchableOpacity
      testID={testID}
      style={styles.btn}
      onPress={onPress}
      activeOpacity={0.5}>
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.white} />
      ) : (
        <Text style={styles.btnText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.blue,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
    height: 50,
    justifyContent: 'center',
  },
  btnText: {color: Colors.white, fontSize: 18},
});
