import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-elements';
import { useAuth } from '../../context/auth';
import textStyles from '../../theme/textStyles';
import styles from './styles';
import useSWR from 'swr';
import { axiosFetcher } from '../../config/axios';
import { IEvent } from '../../types';
import StartEventCard from '../../components/StartEventCard';
import BackHeader from '../../components/BackHeader';
import { useRootStackNavigation } from '../../app.routes';
import eventsService from '../../services/events';
import axios from 'axios';
import { useError } from '../../context/error';

const StreamerSchedule = () => {
  const { user } = useAuth();
  const { data } = useSWR<IEvent[]>('events/not-started', axiosFetcher);
  const { pop } = useRootStackNavigation();

  const { setError } = useError();

  const handleStreamStart = async (eventId: string) => {
    try {
      const { channelName } = await eventsService.startEvent(eventId);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Erro interno do servidor');
      } else {
        setError('Erro ao iniciar stream');
      }
    }
  };

  return (
    <View style={styles.screen}>
      <BackHeader onGoBack={() => pop(1)} title="Perfil streamer" />
      <View style={styles.info}>
        <Avatar
          containerStyle={styles.avatar}
          source={{ uri: user?.avatar }}
          rounded
          size={124}
        />
        <Text style={textStyles.header2}>
          {user?.professional?.artisticName}
        </Text>
      </View>
      <Divider />
      {data && (
        <FlatList
          data={data}
          style={styles.list}
          renderItem={({ item, index }) => (
            <>
              <StartEventCard event={item} onStart={handleStreamStart} />
              {index < data.length - 1 && <Divider />}
            </>
          )}
        />
      )}
    </View>
  );
};

export default StreamerSchedule;
