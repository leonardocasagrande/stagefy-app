import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import textStyles from '../../theme/textStyles';
import { styles } from './styles';

type MessageProps = {
  message: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const Message = ({ message, user }: MessageProps) => {
  return (
    <View style={styles.container}>
      <Avatar
        size={24}
        rounded
        source={{
          uri:
            user.avatar_url ||
            'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
        }}
      />
      <View style={styles.userInfo}>
        <Text style={textStyles.messageName}>{user.name}</Text>
        <Text style={textStyles.messageContent}>{message}</Text>
      </View>
    </View>
  );
};

export default Message;
