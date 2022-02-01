import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import useSWR from 'swr';
import { useRootStackNavigation } from '../../../app.routes';
import { axiosFetcher } from '../../../config/axios';
import { useStream } from '../../../context/stream';
import colors from '../../../theme/colors';
import textStyles from '../../../theme/textStyles';
import { styles } from './styles';

export const RoomHeader: React.FC = () => {
  const { goBack } = useRootStackNavigation();

  const { event } = useStream();

  const handleEndCall = () => {
    goBack();
  };

  const { data } = useSWR<{ currentViews: number }>(
    `/events/${event?.id}/current-views`,
    axiosFetcher,
    {
      refreshInterval: 5000,
    },
  );

  return (
    <>
      <View style={styles.root}>
        <TouchableOpacity style={styles.icon} onPress={handleEndCall}>
          <FontAwesomeIcon icon="chevron-left" color={colors.primaryBg} />
        </TouchableOpacity>
        <Avatar
          source={{
            uri:
              event?.professional.user.avatar ||
              'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
          }}
          size={40}
          rounded
        />
        <Text style={{ ...textStyles.liveName, ...styles.title }}>
          {event?.professional.artisticName}
        </Text>
        <View style={styles.views}>
          <FontAwesomeIcon icon="eye" color={colors.primaryMain} />
          <Text style={{ ...textStyles.viewCount, ...styles.viewCount }}>
            {data ? data.currentViews : ''}
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.button} onPress={handleEndCall}>
        <AntDesignIcon name="closecircle" color="#FFF" size={25} />
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.buttonSwitch} onPress={toggleCamera}>
        <MaterialIconsIcon name="switch-camera" color="#FFF" size={25} />
      </TouchableOpacity> */}
    </>
  );
};
