import React from 'react';
import {
  Modal,
  ModalProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import textStyles from '../../theme/textStyles';
import styles from './styles';

export interface ICenterModalProps extends ModalProps {
  onClose: () => void;
  title?: string;
  description?: string | null;
}

const CenterModal = (props: ICenterModalProps) => {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="fade"
      hardwareAccelerated
    >
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={1}
        onPressOut={props.onClose}
      >
        <TouchableWithoutFeedback>
          <View style={styles.view}>
            {!!props.title && (
              <Text style={{ ...textStyles.header1, ...styles.title }}>
                {props.title}
              </Text>
            )}
            {!!props.description && (
              <Text style={{ ...textStyles.body2, ...styles.description }}>
                {props.description}
              </Text>
            )}
            {props.children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CenterModal;
