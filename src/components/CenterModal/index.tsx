import React, { ReactNode } from 'react';
import {
  Modal,
  ModalProps,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from 'react-native-elements';
import textStyles from '../../theme/textStyles';
import styles from './styles';

export interface ICenterModalProps extends ModalProps {
  onClose?: () => void;
  title?: string;
  description?: string | null;
  contentStyle?: ViewStyle;
  textStyle?: TextStyle;
  topContent?: ReactNode;
}

const CenterModal = (props: ICenterModalProps) => {
  return (
    <Modal
      {...props}
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
          <View style={{ ...styles.view, ...props.contentStyle }}>
            {props.topContent}
            {!!props.title && (
              <Text
                style={{
                  ...textStyles.header1,
                  ...styles.title,
                  ...props.textStyle,
                }}
              >
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
