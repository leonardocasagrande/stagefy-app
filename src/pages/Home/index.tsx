import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { styles } from './styles';
import { useRootStackNavigation } from '../../app.routes';
import { Button } from 'react-native-elements';
import { useAuth } from '../../context/auth';
import { useError } from '../../context/error';
import axios from 'axios';

const Home: React.FC = () => {
  const { signOut } = useAuth();
  const { setError } = useError();

  const { navigate, reset } = useRootStackNavigation();

  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onTextChange = (value: string) => {
    setErrorMessage('');
    setUsername(value);
  };

  const handleJoinDefaultChatRoom = () => {
    if (username.length > 4) {
      navigate('ChatRoom', { username });
    } else {
      setErrorMessage('O seu username deve ter pelo menos 5 caracteres');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <Button title="Logout" onPress={handleLogout} />
      <Text style={styles.title}>Stagefy POC</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu username"
        placeholderTextColor="darkgrey"
        onChangeText={onTextChange}
      />

      {errorMessage.length > 0 && (
        <Text style={styles.inputError}>{errorMessage}</Text>
      )}

      <TouchableOpacity
        onPress={handleJoinDefaultChatRoom}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
