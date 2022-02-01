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
  sendTextMessage: (message: string) => void;
  toggleBroadcaster: () => void;
  isBroadcaster: boolean;
  started: boolean;
  setStarted: (val: boolean) => void;
  selfPeerId: number | undefined;
  streamEnded: boolean;
  enableLocalVideo(): Promise<void>;
  disableLocalVideo(): Promise<void>;
  permissionToJoin(): Promise<void>;
  askedPermission: boolean;
  permissions: MessageData[];
  concedePermission: (userId: string) => Promise<void>;
  denyPermission: (userId: string) => Promise<void>;
  revokePermission: (uid: number) => Promise<void>;
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
  const [isBroadcaster, setIsBroadcaster] = useState(false);
  const { user } = useAuth();
  const [event, setEvent] = useState<IEvent | undefined>();
  const [streamEnded, setStreamEnded] = useState(false);
  const [askedPermission, setAskedPermission] = useState(false);
  const [permissions, setPermissions] = useState<MessageData[]>([]);

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
    await newEngine.enableAudio();
    await newEngine.enableLocalVideo(false);
    await newEngine.enableLocalAudio(false);
    await newEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await newEngine.setClientRole(ClientRole.Broadcaster);
    await newEngine.joinChannelWithUserAccount(token, evt.id, user!.id, {
      publishLocalAudio: false,
      publishLocalVideo: false,
    });

    setEvent(evt);
    setStreamEngine(newEngine);
  };

  const setupListeners = (newEngine: RtcEngine) => {
    newEngine.addListener('UserOffline', userId => {
      console.log('OFFLINE', userId, user?.name, event);
      if (
        user?.profileRole !== ProfileRoleEnum.Professional &&
        userId === event?.streamerPeerId
      ) {
        setStreamEnded(true);
      }
      setPeerIds(values => values.filter(el => el !== userId));
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

    newEngine.addListener('StreamMessage', async (userId, streamId, data) => {
      const parsedMessage = JSON.parse(data) as MessageData;
      switch (parsedMessage.type) {
        case MessageType.Permission:
          if (user?.profileRole === ProfileRoleEnum.Professional) {
            setPermissions(values => [...values, parsedMessage]);
          }
          break;
        case MessageType.PermissionConceded:
          if (user?.id === parsedMessage.user.id) {
            enableLocalVideo();
            setAskedPermission(false);
          }
          break;
        case MessageType.PermissionDenied:
          if (user?.id === parsedMessage.user.id) {
            setAskedPermission(false);
          }
          break;
        case MessageType.PermissionRevoked:
          if (streamEngine) {
            const info = await streamEngine.getUserInfoByUid(
              parsedMessage.user.uid!,
            );
            if (info.userAccount === user?.id) {
              disableLocalVideo();
            }
          }
          break;
        case MessageType.TextMessage:
          if (messages.find(message => message.id === parsedMessage.id)) {
            console.log('StreamMessage', 'already  exists');
          } else {
            console.log('StreamMessage', 'new registed');
            setMessages(state => [...state, parsedMessage]);
          }
          break;
        default:
          console.log('Invalid message');
      }
    });

    newEngine.addListener('UserEnableLocalVideo', (uid, enabled) => {
      if (uid !== event?.streamerPeerId) {
        if (enabled) {
          setPeerIds(values => [...values, uid]);
        } else {
          setPeerIds(values => values.filter(el => el !== uid));
        }
      }
      console.log(uid, enabled, 'UserEnableLocalVideo');
    });
  };

  const enableLocalVideo = async () => {
    if (streamEngine) {
      await streamEngine.muteLocalAudioStream(false);
      await streamEngine.muteLocalVideoStream(false);
      await streamEngine.enableLocalAudio(true);
      await streamEngine.enableLocalVideo(true);
      setIsBroadcaster(true);
    }
  };

  const disableLocalVideo = async () => {
    if (streamEngine) {
      await streamEngine.muteLocalAudioStream(true);
      await streamEngine.muteLocalVideoStream(true);
      await streamEngine.enableLocalAudio(false);
      await streamEngine.enableLocalVideo(false);
      setIsBroadcaster(false);
    }
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

  const createMessage = (message: string): MessageData => {
    const newMessage: MessageData = {
      id: randomId(),
      message,
      type: MessageType.TextMessage,
      user: {
        name: user!.professional?.artisticName || user!.name,
        id: user!.id,
        avatar_url:
          user!.avatar ||
          'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
      },
    };

    setMessages(state => [...state, newMessage]);
    return newMessage;
  };

  const sendTextMessage = (message: string) => {
    const msg = createMessage(message);
    sendMessage(msg);
  };

  const sendMessage = async (message: MessageData) => {
    if (streamEngine) {
      try {
        const streamId = await streamEngine.createDataStreamWithConfig(
          new DataStreamConfig(true, true),
        );

        await streamEngine.sendStreamMessage(
          streamId!,
          JSON.stringify(message),
        );
      } catch (err) {
        console.log('StreamContext - sendTextMessage() error:', err);
      }
    } else {
      console.log('sendTextMessage: Engine is empty');
    }
  };

  const createPermissionMessage = (
    name: string,
    id: string,
    avatar?: string,
  ) => {
    const newMessage: MessageData = {
      id: randomId(),
      message: `${name} quer participar desse vídeo ao vivo.`,
      type: MessageType.Permission,
      user: {
        id,
        name: name,
        avatar_url:
          avatar ||
          'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
      },
    };
    return newMessage;
  };

  const createResponsePermissionMessage = (userId: string, accept: boolean) => {
    const newMessage: MessageData = {
      id: randomId(),
      message: '',
      type: accept
        ? MessageType.PermissionConceded
        : MessageType.PermissionDenied,
      user: {
        id: userId,
        name: '',
        avatar_url: '',
      },
    };
    return newMessage;
  };

  const createRevokeMessage = (uid: number) => {
    const newMessage: MessageData = {
      id: randomId(),
      message: '',
      type: MessageType.PermissionRevoked,
      user: {
        id: '',
        name: '',
        avatar_url: '',
        uid,
      },
    };
    return newMessage;
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

  const permissionToJoin = async () => {
    if (user) {
      setAskedPermission(true);
      const msg = createPermissionMessage(user.name, user.id, user.avatar);
      sendMessage(msg);
    }
  };

  const concedePermission = async (userId: string) => {
    const msg = createResponsePermissionMessage(userId, true);
    const newArr = [...permissions];
    newArr.shift();
    setPermissions(newArr);
    await sendMessage(msg);
  };

  const denyPermission = async (userId: string) => {
    const msg = createResponsePermissionMessage(userId, false);
    const newArr = [...permissions];
    newArr.shift();
    setPermissions(newArr);
    await sendMessage(msg);
  };

  const revokePermission = async (uid: number) => {
    const msg = createRevokeMessage(uid);
    await sendMessage(msg);
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
        event,
        messages,
        peerIds,
        sendTextMessage,
        toggleBroadcaster,
        isBroadcaster,
        joinCall,
        started,
        setStarted,
        selfPeerId,
        streamEnded,
        enableLocalVideo,
        permissionToJoin,
        askedPermission,
        permissions,
        concedePermission,
        denyPermission,
        disableLocalVideo,
        revokePermission,
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
