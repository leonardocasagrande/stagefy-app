import React, { ReactNode } from 'react';
import {
  Modal,
  ModalProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from 'react-native-elements';
import textStyles from '../../theme/textStyles';
import styles from './styles';

export interface IStyledModalProps extends ModalProps {
  onClose: () => void;
  icon?: ReactNode;
  title?: string;
  description?: string | null;
  contentStyle?: ViewStyle;
}

const StyledModal = (props: IStyledModalProps) => {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="slide"
      hardwareAccelerated
    >
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={1}
        onPressOut={props.onClose}
      >
        <TouchableWithoutFeedback>
          <View style={{ ...styles.view, ...props.contentStyle }}>
            <TouchableWithoutFeedback onPress={props.onClose}>
              <View style={styles.bar} />
            </TouchableWithoutFeedback>
            {!!props.icon && <View style={styles.icon}>{props.icon}</View>}
            {!!props.title && (
              <Text style={textStyles.header1}>{props.title}</Text>
            )}
            {!!props.description && (
              <Text style={textStyles.body2}>{props.description}</Text>
            )}
            {props.children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default StyledModal;
