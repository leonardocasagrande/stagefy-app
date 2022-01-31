import axios from 'axios';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-elements';
import useSWR from 'swr';
import { useRootStackNavigation } from '../../app.routes';
import BackHeader from '../../components/BackHeader';
import StartEventCard from '../../components/StartEventCard';
import { axiosFetcher } from '../../config/axios';
import { useAuth } from '../../context/auth';
import { useError } from '../../context/error';
import { useStream } from '../../context/stream';
import eventsService from '../../services/events';
import textStyles from '../../theme/textStyles';
import { IEvent } from '../../types';
import styles from './styles';

const StreamerSchedule = () => {
  const { user } = useAuth();
  const { startCall } = useStream();
  const { data } = useSWR<IEvent[]>('events/not-started', axiosFetcher);
  const { pop, navigate } = useRootStackNavigation();

  const { setError } = useError();

  const handleStreamStart = async (event: IEvent) => {
    try {
      const token = await eventsService.previewEvent(event.id);
      await startCall(event, token);
      navigate('ChatRoom', {});
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
          source={{
            uri:
              user?.avatar ||
              'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
          }}
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
