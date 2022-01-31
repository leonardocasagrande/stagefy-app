import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RtcRemoteView, VideoRenderMode } from 'react-native-agora';
import { useRootStackNavigation } from '../../app.routes';
import { Chat } from '../../components/Chat';
import { RoomHeader } from '../../components/RoomHeader';
import RoomSidebar from '../../components/RoomSidebar';
import { useStream } from '../../context/stream';
import eventsService from '../../services/events';
import { styles } from './styles';

const UserStreamRoom: React.FC = () => {
  const navigation = useRootStackNavigation();

  const { streamEngine, event, endCall, streamEnded } = useStream();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        endCall();
        eventsService.leaveEvent(event!.id!);
      }),
    [navigation, endCall, event],
  );

  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeTabs' }],
    });
  }, [streamEnded, navigation]);

  return (
    <View style={styles.fullView}>
      {streamEngine && event ? (
        <>
          <RtcRemoteView.SurfaceView
            style={styles.frame}
            uid={event.streamerPeerId!}
            channelId={event.id}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />

          <RoomHeader />
          <RoomSidebar />
          <Chat />
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Carregando chat...</Text>
        </View>
      )}
    </View>
  );
};

export default UserStreamRoom;
