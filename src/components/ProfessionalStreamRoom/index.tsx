import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RtcLocalView, VideoRenderMode } from 'react-native-agora';
import { useRootStackNavigation } from '../../app.routes';
import { useStream } from '../../context/stream';
import { Chat } from '../Chat';
import StartStreamModal from '../StartStreamModal';
import StreamerHeader from '../StreamerHeader';
import StreamerStartedHeader from '../StreamerStartedHeader';
import { styles } from './styles';

const ProfessionalStreamRoom = () => {
  const navigation = useRootStackNavigation();

  const { streamEngine, event, started, endCall } = useStream();
  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        endCall();
      }),
    [navigation, endCall, event],
  );
  return (
    <View style={styles.fullView}>
      {streamEngine && event ? (
        <>
          <RtcLocalView.SurfaceView
            style={styles.frame}
            channelId={event.id}
            renderMode={VideoRenderMode.Hidden}
          />

          {started ? (
            <>
              <StreamerStartedHeader />
              <Chat />
            </>
          ) : (
            <>
              <StreamerHeader />
              <StartStreamModal />
            </>
          )}
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

export default ProfessionalStreamRoom;
