import React from 'react';
import { Image, View, Text } from 'react-native';
import { styles } from './styles';

type CardItemProps = {
  message: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

export const CartItem: React.FC<CardItemProps> = ({ user, message }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            user.avatar_url ||
            'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
        }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};
