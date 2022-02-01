import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import { useRootStackNavigation } from '../../app.routes';
import { Chat } from '../../components/Chat';
import { RoomHeader } from './RoomHeader';
import RoomSidebar from './RoomSidebar';
import { useStream } from '../../context/stream';
import eventsService from '../../services/events';
import { styles } from './styles';
import { randomId } from '../../pages/utils/generateRandomId';

const UserStreamRoom: React.FC = () => {
  const navigation = useRootStackNavigation();

  const { streamEngine, event, endCall, streamEnded, peerIds, isBroadcaster } =
    useStream();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        endCall();
        eventsService.leaveEvent(event!.id!);
      }),
    [navigation, endCall, event],
  );

  useEffect(() => {
    if (streamEnded) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      });
    }
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
          {(!!peerIds.length || isBroadcaster) && (
            <View style={styles.peersContainer}>
              {isBroadcaster && (
                <RtcLocalView.SurfaceView
                  style={styles.frame}
                  channelId={event.id}
                  renderMode={VideoRenderMode.Hidden}
                />
              )}
              {peerIds.map(value => (
                <RtcRemoteView.SurfaceView
                  key={`${event.id}${value}${randomId()}`}
                  style={styles.frame}
                  uid={value}
                  channelId={event.id}
                  renderMode={VideoRenderMode.Hidden}
                  zOrderMediaOverlay={true}
                />
              ))}
            </View>
          )}

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
