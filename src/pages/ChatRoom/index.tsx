import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import { useRootStackNavigation } from '../../app.routes';
import { Chat } from '../../components/Chat';
import { RoomHeader } from '../../components/RoomHeader';
import { useStream } from '../../context/stream';
import { randomId } from '../utils/generateRandomId';
import { styles } from './styles';

const ChatRoom: React.FC = () => {
  const navigation = useRootStackNavigation();

  const { streamEngine, channelName, peerIds, endCall } = useStream();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        endCall();
      }),
    [navigation, endCall],
  );

  return (
    <View style={styles.fullView}>
      {streamEngine ? (
        <>
          <RtcLocalView.SurfaceView
            style={styles.frame}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
          />
          <ScrollView style={styles.remoteContainer} horizontal={true}>
            {peerIds.map(value => (
              <RtcRemoteView.SurfaceView
                key={`${channelName}${value}${randomId()}`}
                style={styles.remote}
                uid={value}
                channelId={channelName}
                renderMode={VideoRenderMode.Hidden}
                zOrderMediaOverlay={true}
              />
            ))}
          </ScrollView>
          <RoomHeader />
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

export default ChatRoom;
