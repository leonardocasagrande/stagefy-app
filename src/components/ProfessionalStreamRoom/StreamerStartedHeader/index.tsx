import React, { useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { useStream } from '../../../context/stream';
import textStyles from '../../../theme/textStyles';
import { styles } from './styles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../theme/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CenterModal from '../../CenterModal';
import eventsService from '../../../services/events';
import { useRootStackNavigation } from '../../../app.routes';
import useSWR from 'swr';
import { axiosFetcher } from '../../../config/axios';

const StreamerStartedHeader = () => {
  const { event, endCall } = useStream();
  const [openEndStream, setOpenEndStream] = useState(false);
  const [loadingEnd, setLoadingEnd] = useState(false);
  const { reset } = useRootStackNavigation();

  const { data } = useSWR<{ currentViews: number }>(
    `events/${event!.id}/current-views`,
    axiosFetcher,
    { refreshInterval: 3000 },
  );

  const handleStreamEnd = async () => {
    setLoadingEnd(true);
    try {
      await eventsService.endEvent(event!.id);
      endCall();
      reset({
        index: 0,
        routes: [{ name: 'StreamerHome' }],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.root}>
        <View style={styles.avatarContainer}>
          <Avatar source={{ uri: event?.image }} size={20} rounded />
          <View style={styles.textContainer}>
            <Text style={textStyles.liveNameStarted}>{event?.name}</Text>
            <Text style={textStyles.liveSubtitleStarted}>0 curtidas</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setOpenEndStream(true)}>
          <MaterialCommunityIcon
            name="close-circle"
            size={20}
            color={colors.primaryBg}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewCountContainer}>
        <View style={styles.avatarContainer}>
          <FontAwesomeIcon
            style={styles.icon}
            name="eye"
            color={colors.primaryBg}
          />
          <Text style={textStyles.viewCountWhite}>
            {data ? data.currentViews : ''}
          </Text>
        </View>
      </View>
      <CenterModal
        visible={openEndStream}
        onClose={() => setOpenEndStream(false)}
        title="Finalizar a live"
        description="Você deseja mesmo encerrar essa live?"
      >
        <View>
          <Button
            title="Encerrar live"
            buttonStyle={styles.endButton}
            onPress={handleStreamEnd}
            loading={loadingEnd}
          />
          <Button title="Cancelar" type="clear" />
        </View>
      </CenterModal>
    </>
  );
};

export default StreamerStartedHeader;
