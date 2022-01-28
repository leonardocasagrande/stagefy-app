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

const StreamerSchedule = () => {
  const { user } = useAuth();
  const { data } = useSWR<IEvent[]>('events/not-started', axiosFetcher);
  const { pop } = useRootStackNavigation();
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
              <StartEventCard event={item} onStart={console.log} />
              {index < data.length - 1 && <Divider />}
            </>
          )}
        />
      )}
    </View>
  );
};

export default StreamerSchedule;
