import React from 'react';
import { FlatList, Image, View } from 'react-native';
import useSWR from 'swr';
import { useRootStackNavigation } from '../../../app.routes';
import carousel1 from '../../../assets/images/carousel_1.png';
import EventCard from '../../../components/EventCard';
import { axiosFetcher } from '../../../config/axios';
import { useStream } from '../../../context/stream';
import eventsService from '../../../services/events';
import { IEvent } from '../../../types';
import styles from './styles';

const Lives = () => {
  const { data } = useSWR<IEvent[]>('events/ongoing', axiosFetcher, {
    refreshInterval: 5000,
  });
  const { navigate } = useRootStackNavigation();
  const { joinCall } = useStream();

  const handleEventOpen = async (evt: IEvent) => {
    try {
      const { event, token } = await eventsService.joinEvent(evt.id);
      await joinCall(event, token);
      navigate('ChatRoom', {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Image source={carousel1} />
      {!!data && (
        <FlatList
          style={styles.lives}
          columnWrapperStyle={styles.column}
          data={data}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <EventCard onPress={handleEventOpen} event={item} />
          )}
        />
      )}
    </View>
  );
};

export default Lives;
