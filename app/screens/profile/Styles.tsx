import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  labelText: {
    color: Colors.grey,
    fontSize: 18,
    marginBottom: 5,
  },
  dataText: {
    color: Colors.black,
    fontSize: 22,
    marginBottom: 15,
  },
  inputStyle: {
    backgroundColor: Colors.pink,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 8,
    color: Colors.black,
  },
  viewMap: {
    width: '100%',
    height: '25%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {width: '100%', height: '100%'},
});
