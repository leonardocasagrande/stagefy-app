import React from 'react';
import { View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { useAuth } from '../../../../context/auth';
import { MessageData } from '../../../../models/message';
import CenterModal from '../../../CenterModal';
import styles from './styles';

interface IPermissionModalProps {
  permission: MessageData;
  onClose(): void;
  onAccept(): void;
}

const PermissionModal = ({
  permission,
  onClose,
  onAccept,
}: IPermissionModalProps) => {
  const { user } = useAuth();

  return (
    <CenterModal
      title={permission.message}
      contentStyle={styles.modalContent}
      textStyle={styles.modalText}
      topContent={
        <View style={styles.topContent}>
          <Avatar
            source={{
              uri:
                user?.avatar ||
                'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
            }}
            size={80}
            rounded
            containerStyle={styles.avatarLeft}
          />
          <Avatar
            source={{
              uri:
                permission.user.avatar_url ||
                'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
            }}
            size={80}
            containerStyle={styles.avatarRight}
            rounded
          />
        </View>
      }
    >
      <View>
        <Button
          title="Entrar ao vivo com participante"
          buttonStyle={styles.button}
          onPress={onAccept}
        />
        <Button
          onPress={onClose}
          title="Cancelar"
          type="clear"
          titleStyle={styles.cancelButton}
        />
      </View>
    </CenterModal>
  );
};

export default PermissionModal;
