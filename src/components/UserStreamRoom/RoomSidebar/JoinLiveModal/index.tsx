import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import StyledModal from '../../../StyledModal';
import styles from './styles';

interface IJoinLiveModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const JoinLiveModal = ({ open, onClose, onConfirm }: IJoinLiveModalProps) => {
  return (
    <StyledModal
      visible={open}
      onClose={onClose}
      title="Participar da live?"
      contentStyle={styles.content}
    >
      <View style={styles.actionsContainer}>
        <Button
          buttonStyle={styles.confirmButton}
          onPress={onConfirm}
          title="Participar"
        />
        <Button
          buttonStyle={styles.cancelButton}
          onPress={onClose}
          title="Cancelar"
        />
      </View>
    </StyledModal>
  );
};

export default JoinLiveModal;
