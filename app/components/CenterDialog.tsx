import React, {ReactNode} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppIcons} from '../assets/icons';
import {Colors} from '../utils/colors';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const CenterDialog: React.FC<DialogProps> = ({
  visible,
  title,
  onClose,
  children,
}) => {
  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.bgView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity onPress={() => onClose()}>
              <Image source={AppIcons.close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  bgView: {
    flex: 1,
    backgroundColor: Colors.dialogBg,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {flex: 1, fontSize: 16},
});
