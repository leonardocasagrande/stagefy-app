import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStream } from '../../../context/stream';
import { MessageData } from '../../../models/message';
import colors from '../../../theme/colors';
import PermissionModal from './PermissionModal';
import styles from './styles';

const PermissionsFloatButton = () => {
  const { permissions, concedePermission, denyPermission } = useStream();
  const [currentPermission, setCurrentPermission] =
    useState<MessageData | null>(null);
  const handleClosePermission = () => {
    if (currentPermission) {
      try {
        denyPermission(currentPermission.user.id);
        setCurrentPermission(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAcceptPermission = async () => {
    if (currentPermission) {
      try {
        concedePermission(currentPermission.user.id);
        setCurrentPermission(null);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      {!!permissions.length && (
        <TouchableOpacity
          style={styles.root}
          onPress={() => setCurrentPermission(permissions[0])}
        >
          <MaterialCommunityIcon
            name="video-outline"
            color={colors.primaryMain}
            size={24}
          />
          <Badge
            status="error"
            value={permissions.length}
            containerStyle={styles.badge}
          />
        </TouchableOpacity>
      )}
      {!!currentPermission && (
        <PermissionModal
          onClose={handleClosePermission}
          onAccept={handleAcceptPermission}
          permission={currentPermission}
        />
      )}
    </>
  );
};

export default PermissionsFloatButton;
