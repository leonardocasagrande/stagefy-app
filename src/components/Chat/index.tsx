import React, { useEffect, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { useStream } from '../../context/stream';
import { MessageData } from '../../models/message';
import { ChatActions } from '../ChatActions';
import Message from '../Message';
import { styles } from './styles';

export const Chat: React.FC = () => {
  const { messages } = useStream();

  const listRef = useRef<FlatList<MessageData>>(null);

  useEffect(() => {
    if (messages && listRef.current) {
      listRef.current.scrollToEnd();
    }
  }, [messages, listRef]);

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          ref={listRef}
          renderItem={({ item }) => (
            <Message message={item.message} user={item.user} />
          )}
        />
      </View>
      <ChatActions />
    </View>
  );
};
