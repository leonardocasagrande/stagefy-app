import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useStream } from '../../context/stream';
import colors from '../../theme/colors';
import { styles } from './styles';

export const ChatActions: React.FC = () => {
  const { sendTextMessage } = useStream();

  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text) {
      sendTextMessage(text);

      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        maxLength={200}
        placeholder="Adicionar um comentário"
        placeholderTextColor={colors.disabled}
        onSubmitEditing={handleSubmit}
        returnKeyType="send"
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};
