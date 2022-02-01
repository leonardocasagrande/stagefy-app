import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useSWR from 'swr';
import { axiosFetcher } from '../../../config/axios';
import { useStream } from '../../../context/stream';
import likesService from '../../../services/likes';
import colors from '../../../theme/colors';
import JoinLiveModal from './JoinLiveModal';
import styles from './styles';

const RoomSidebar = () => {
  const {
    event,
    permissionToJoin,
    askedPermission,
    isBroadcaster,
    disableLocalVideo,
  } = useStream();
  const { data, mutate } = useSWR(`likes/${event!.id}`, axiosFetcher);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    try {
      if (data) {
        await likesService.removeLike(event!.id);
      } else {
        await likesService.addLike(event!.id);
      }
      mutate();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleJoinConfirm = () => {
    setOpen(false);
    permissionToJoin();
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={handleLike} disabled={loading}>
        <MaterialCommunityIcon
          name={data ? 'heart' : 'heart-outline'}
          color={loading ? colors.disabled : colors.primaryMain}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcon
          style={styles.icon}
          name="gift-outline"
          color={colors.primaryMain}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity disabled={askedPermission}>
        <MaterialCommunityIcon
          style={styles.icon}
          name={isBroadcaster ? 'video' : 'video-outline'}
          color={askedPermission ? colors.disabled : colors.primaryMain}
          size={24}
          onPress={isBroadcaster ? disableLocalVideo : () => setOpen(true)}
        />
      </TouchableOpacity>
      <JoinLiveModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleJoinConfirm}
      />
    </View>
  );
};

export default RoomSidebar;
