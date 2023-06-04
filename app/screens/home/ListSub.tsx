import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../utils/colors';
import {ListSubData} from '../../types/type';

interface ListSubProps {
  subcategory: ListSubData[];
}

export const ListSub: React.FC<ListSubProps> = ({subcategory}) => {
  return (
    <FlatList
      data={subcategory}
      renderItem={({item, index}) => (
        <TouchableOpacity key={index} style={styles.content}>
          <View style={styles.separator} />
          <View style={styles.container}>
            <Image source={{uri: item?.image}} style={styles.imgIcon} />
            <View style={styles.lblContainer}>
              <Text style={styles.titleText}>{item?.title}</Text>
              <Text style={styles.titleDesc}>{item?.desc}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: Colors.separator,
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  container: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
  },
  imgIcon: {width: 45, height: 45},
  lblContainer: {marginHorizontal: 10},
  titleText: {fontWeight: '700', fontSize: 18, color: Colors.black},
  titleDesc: {fontSize: 14, color: Colors.grey},
});
