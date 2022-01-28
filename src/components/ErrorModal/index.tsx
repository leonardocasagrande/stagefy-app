import React from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import StyledModal, { IStyledModalProps } from '../StyledModal';
import error from '../../assets/images/error.png';
import styles from './styles';

const ErrorModal = (props: IStyledModalProps) => {
  return (
    <StyledModal
      {...props}
      onClose={props.onClose}
      title="OPS!"
      icon={<Image source={error} />}
    >
      <View style={styles.view}>
        <Button
          title="OK, OBRIGADA"
          buttonStyle={styles.button}
          onPress={props.onClose}
        />
      </View>
    </StyledModal>
  );
};

export default ErrorModal;
