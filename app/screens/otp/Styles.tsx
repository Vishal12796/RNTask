import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  countryContainer: {flexDirection: 'row'},
  mobNumStyles: {
    backgroundColor: Colors.pink,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 8,
    flex: 1,
    marginStart: 10,
  },
  countryCodeView: {
    backgroundColor: Colors.pink,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
