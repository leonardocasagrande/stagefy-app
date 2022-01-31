import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useRootStackNavigation } from '../../app.routes';
import { useAuth } from '../../context/auth';
import { useError } from '../../context/error';
import { useLoading } from '../../context/loading';
import textStyles from '../../theme/textStyles';
import BackHeader from '../BackHeader';
import HomeButton from '../HomeButton';
import IconButton from '../IconButton';
import styles from './styles';

interface IProfileContentProps {
  onGoBack?(): void;
}

const ProfileContent = ({ onGoBack }: IProfileContentProps) => {
  const { user, signOut } = useAuth();
  const { setLoading } = useLoading();
  const { setError } = useError();
  const { reset, navigate } = useRootStackNavigation();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Erro interno do servidor');
      }
    }
    setLoading(false);
  };
  return (
    <View style={styles.screen}>
      <BackHeader onGoBack={console.log} title="Meu perfil" />
      <View style={styles.info}>
        <Avatar
          containerStyle={styles.avatar}
          source={{
            uri:
              user?.avatar ||
              'http://ibaseminario.com.br/novo/wp-content/uploads/2013/09/default-avatar.png',
          }}
          rounded
          size={120}
        />
        <Text style={textStyles.header2}>
          {user?.professional?.artisticName || user?.name}
        </Text>
      </View>
      <View style={styles.actions}>
        <HomeButton
          onPress={console.log}
          icon={<FontAwesomeIcon icon="edit" />}
          title="Editar Perfil"
        />
        <HomeButton
          onPress={console.log}
          icon={<FontAwesomeIcon icon="users" />}
          title="Meus Perfis"
        />
        <HomeButton
          onPress={console.log}
          icon={<FontAwesomeIcon icon="wallet" />}
          title="Minha Carteira"
        />
        {!!user?.professional && (
          <HomeButton
            onPress={() => navigate('StreamerSchedule')}
            icon={<FontAwesomeIcon icon="satellite-dish" />}
            title="Agenda de lives"
          />
        )}
      </View>
      <View style={styles.bottom}>
        <IconButton
          icon="trash-alt"
          title="Excluir perfil"
          onPress={console.log}
        />
        <IconButton
          icon="sign-out-alt"
          title="Sair da minha conta"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

export default ProfileContent;
