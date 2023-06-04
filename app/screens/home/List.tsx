import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {AppIcons} from '../../assets/icons';
import {ListMain} from '../../types/type';
import {Colors} from '../../utils/colors';
import {ListData} from '../../utils/data';
import {ListSub} from './ListSub';

export const List: React.FC = () => {
  const [listDataSource, setListDataSource] = useState<ListMain[]>(ListData);
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    array[index].isExpanded = !array[index].isExpanded;
    setListDataSource(array);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{paddingBottom: 20}}
        data={listDataSource}
        renderItem={({item, index}) => (
          <ExpandableComponent
            key={item?.category_name}
            onClickFunction={() => {
              updateLayout(index);
            }}
            item={item}
          />
        )}
      />
    </View>
  );
};

const ExpandableComponent: React.FC<{
  item: ListMain;
  onClickFunction: () => void;
}> = ({item, onClickFunction}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View style={styles.content}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <View style={styles.viewContainer}>
          <Image source={{uri: item?.image}} style={styles.imgIcon} />
          <View style={styles.lblContainer}>
            <Text style={styles.catTitleText}>{item?.catTitle}</Text>
            <Text style={styles.catSubText}>{item?.catSub}</Text>
          </View>
          <Image
            source={AppIcons.downArrow}
            style={{
              ...styles.imgArrow,
              transform: [{rotate: item.isExpanded ? '180deg' : '0deg'}],
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        <ListSub subcategory={item.subcategory} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListStyle: {marginHorizontal: 10, paddingTop: 20},
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    padding: 15,
  },
  content: {
    borderRadius: 15,
    backgroundColor: Colors.white,
    marginBottom: 10,
    overflow: 'hidden',
  },
  viewContainer: {flexDirection: 'row', alignItems: 'center'},
  imgIcon: {width: 50, height: 50},
  imgArrow: {width: 25, height: 25},
  lblContainer: {marginHorizontal: 10, flex: 1},
  catSubText: {fontSize: 16, color: Colors.grey},
  catTitleText: {fontWeight: '700', fontSize: 22, color: Colors.black},
});
