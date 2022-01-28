import React from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import StyledModal, { IStyledModalProps } from '../StyledModal';
import success from '../../assets/images/success.png';
import styles from './styles';

const SuccessModal = (props: IStyledModalProps) => {
  return (
    <StyledModal
      {...props}
      onClose={props.onClose}
      title="AÇÃO BEM SUCEDIDA!"
      icon={<Image source={success} />}
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

export default SuccessModal;
