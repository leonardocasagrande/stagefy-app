import React, { createContext, useEffect, useState } from 'react';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  DataStreamConfig,
  RtcEngineContext,
} from 'react-native-agora';
import { MessageData, MessageType } from '../models/message';
import { ProfileRoleEnum } from '../models/role';
import { randomId } from '../pages/utils/generateRandomId';
import { requestCameraAndAudioPermission } from '../pages/utils/permissions';
import { IEvent } from '../types';
import { useAuth } from './auth';

const AGORA_APP_ID = 'a053937c8a524a0690b70625664e4df6';

type StreamContextProps = {
  streamEngine: RtcEngine | undefined;
  appId: string;
  event: IEvent | undefined;
  startCall: (event: IEvent, token: string) => Promise<void>;
  joinCall: (event: IEvent, token: string) => Promise<void>;
  endCall: () => void;
  messages: MessageData[];
  peerIds: number[];
  toggleCamera: () => void;
  sendTextMessage: (message: string) => void;
  toggleMicrophone: () => void;
  isMicrophoneOpen: boolean;
  toggleBroadcaster: () => void;
  isBroadcaster: boolean;
  started: boolean;
  setStarted: (val: boolean) => void;
  selfPeerId: number | undefined;
  streamEnded: boolean;
};

export const StreamContext = createContext<StreamContextProps>(
  {} as StreamContextProps,
);

export const StreamProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [peerIds, setPeerIds] = useState<number[]>([]);
  const [selfPeerId, setSelfPeerId] = useState<number | undefined>();
  const [started, setStarted] = useState(false);
  const [streamEngine, setStreamEngine] = useState<RtcEngine | undefined>(
    undefined,
  );
  const [isMicrophoneOpen, setIsMicrophoneOpen] = useState(true);
  const [isBroadcaster, setIsBroadcaster] = useState(false);
  const { user } = useAuth();
  const [event, setEvent] = useState<IEvent | undefined>();
  const [streamEnded, setStreamEnded] = useState(false);

  const startCall = async (evt: IEvent, token: string) => {
    try {
      const newEngine = await RtcEngine.createWithContext(
        new RtcEngineContext(AGORA_APP_ID),
      );
      await newEngine.enableVideo();
      await newEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);
      await newEngine.setClientRole(ClientRole.Broadcaster);
      await newEngine.setCameraAutoFocusFaceModeEnabled(true);

      await newEngine.joinChannelWithUserAccount(token, evt.id, user!.id);
      setEvent(evt);
      setStreamEngine(newEngine);
    } catch (error) {
      console.log('StreamContext - startCall() error:', error);
    }
  };

  const joinCall = async (evt: IEvent, token: string) => {
    const newEngine = await RtcEngine.createWithContext(
      new RtcEngineContext(AGORA_APP_ID),
    );
    await newEngine.enableVideo();
    await newEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await newEngine.setClientRole(ClientRole.Broadcaster);
    await newEngine.joinChannelWithUserAccount(token, evt.id, user!.id, {
      publishLocalAudio: false,
      publishLocalVideo: false,
    });

    // setPeerIds([evt.streamerPeerId!]);
    setEvent(evt);
    setStreamEngine(newEngine);
  };

  const setupListeners = (newEngine: RtcEngine) => {
    newEngine.addListener('UserJoined', async (userId, elapsed) => {
      // if (user?.profileRole === ProfileRoleEnum.Professional) {
      //   const a = await streamEngine?.getUserInfoByUid(userId);
      //   const message: MessageData = {
      //     id: randomId(),
      //     message: 'entrou',
      //     type: MessageType.TextMessage,
      //     user: {
      //       avatar_url:
      //         'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
      //       name: a?.userAccount || '',
      //     },
      //   };
      //   console.log('UserJoined', userId, elapsed, a);
      //   setMessages(state => [...state, message]);
      // }
      // setPeerIds(state => {
      //   if (state.find(item => item === userId)) {
      //     return state;
      //   } else {
      //     return [...state, userId];
      //   }
      // });
    });

    newEngine.addListener('UserOffline', userId => {
      console.log('OFFLINE', userId, user?.name, event);
      if (
        user?.profileRole !== ProfileRoleEnum.Professional &&
        userId === event?.streamerPeerId
      ) {
        setStreamEnded(true);
      }
    });

    newEngine.addListener(
      'JoinChannelSuccess',
      async (channel, userId, elapsed) => {
        if (user?.profileRole === ProfileRoleEnum.Professional) {
          setSelfPeerId(userId);
        }
        console.log('JoinChannelSuccess', channel, userId, elapsed);
      },
    );

    newEngine.addListener('StreamMessage', (userId, streamId, data) => {
      console.log('StreamMessage', userId, streamId, data);
      const parsedMessage = JSON.parse(data) as MessageData;
      if (messages.find(message => message.id === parsedMessage.id)) {
        console.log('StreamMessage', 'already  exists');
        return;
      } else {
        console.log('StreamMessage', 'new registed');
        setMessages(state => [...state, parsedMessage]);
      }
    });
  };

  const toggleBroadcaster = async () => {
    console.log('isBroadcaster', isBroadcaster);

    if (streamEngine) {
      try {
        if (isBroadcaster) {
          await streamEngine.enableVideo();
        } else {
          await streamEngine.disableVideo();
        }
      } catch (error) {
        console.log('StreamContext - toggleBroadcaster() error:', error);
      }
    } else {
      console.log('toggleBroadcaster: Engine is empty');
    }
  };

  const createMessage = (message: string): string => {
    const newMessage: MessageData = {
      id: randomId(),
      message,
      type: MessageType.TextMessage,
      user: {
        name: user!.professional?.artisticName || user!.name,
        avatar_url:
          user!.avatar ||
          'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
      },
    };

    setMessages(state => [...state, newMessage]);
    return JSON.stringify(newMessage);
  };

  const sendTextMessage = async (message: string) => {
    if (streamEngine) {
      const messageDate = createMessage(message);

      try {
        const streamId = await streamEngine.createDataStreamWithConfig(
          new DataStreamConfig(true, true),
        );

        console.log('sendTextMessage streamId', streamId);

        await streamEngine.sendStreamMessage(streamId!, messageDate);
      } catch (error) {
        console.log('StreamContext - sendTextMessage() error:', error);
      }
    } else {
      console.log('sendTextMessage: Engine is empty');
    }
  };

  const endCall = async () => {
    if (streamEngine) {
      try {
        await streamEngine.disableVideo();
        await streamEngine.disableAudio();
        await streamEngine.leaveChannel();
        await streamEngine.destroy();
        setStreamEngine(undefined);
        setStarted(false);
      } catch (error) {
        console.log('StreamContext - endCall() error:', error);
      }
    } else {
      console.log('endCall: Engine is empty');
    }

    setPeerIds([]);
    setMessages([]);
  };

  const toggleCamera = async () => {
    if (streamEngine) {
      try {
        await streamEngine.switchCamera();
      } catch (error) {
        console.log('StreamContext - toggleCamera() error:', error);
      }
    } else {
      console.log('toggleCamera: Engine is empty');
    }
  };

  const toggleMicrophone = async () => {
    if (streamEngine) {
      try {
        await streamEngine.enableLocalAudio(!isMicrophoneOpen);
        setIsMicrophoneOpen(state => !state);
      } catch (error) {
        console.log('StreamContext - toggleMicrophone() error:', error);
      }
    } else {
      console.log('toggleMicrophone: Engine is empty');
    }
  };

  useEffect(() => {
    requestCameraAndAudioPermission();
  }, []);

  useEffect(() => {
    if (streamEngine) {
      setupListeners(streamEngine);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamEngine]);

  return (
    <StreamContext.Provider
      value={{
        streamEngine,
        appId: AGORA_APP_ID,
        startCall,
        endCall,
        toggleCamera,
        event,
        messages,
        peerIds,
        sendTextMessage,
        isMicrophoneOpen,
        toggleMicrophone,
        toggleBroadcaster,
        isBroadcaster,
        joinCall,
        started,
        setStarted,
        selfPeerId,
        streamEnded,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};

export function useStream(): StreamContextProps {
  const context = React.useContext(StreamContext);

  if (!context) {
    throw new Error('useStream must be used within an StreamProvider');
  }

  return context;
}
