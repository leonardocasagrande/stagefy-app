import React, { useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import { useRootStackNavigation } from '../../app.routes';
import { useStream } from '../../context/stream';
import { randomId } from '../../pages/utils/generateRandomId';
import { Chat } from '../Chat';
import StartStreamModal from './StartStreamModal';
import StreamerHeader from './StreamerHeader';
import StreamerStartedHeader from './StreamerStartedHeader';
import PermissionsFloatButton from './PermissionsFloatButton';
import { styles } from './styles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';

const ProfessionalStreamRoom = () => {
  const navigation = useRootStackNavigation();

  const { streamEngine, event, started, endCall, peerIds, revokePermission } =
    useStream();
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
          {!!peerIds.length && (
            <View style={styles.peersContainer}>
              {peerIds.map(value => (
                <View
                  key={`${event.id}${value}${randomId()}`}
                  style={styles.peerCamContainer}
                >
                  <RtcRemoteView.SurfaceView
                    style={styles.peerCam}
                    uid={value}
                    channelId={event.id}
                    renderMode={VideoRenderMode.Hidden}
                    zOrderMediaOverlay={true}
                  />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => revokePermission(value)}
                  >
                    <MaterialCommunityIcon
                      name="close-circle"
                      color={colors.primaryMain}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {started ? (
            <>
              <StreamerStartedHeader />
              <Chat />
              <PermissionsFloatButton />
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
