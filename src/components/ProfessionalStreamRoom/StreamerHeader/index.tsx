import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useRootStackNavigation } from '../../../app.routes';
import { useStream } from '../../../context/stream';
import colors from '../../../theme/colors';
import textStyles from '../../../theme/textStyles';
import { styles } from './styles';

const StreamerHeader = () => {
  const { event } = useStream();
  const { goBack } = useRootStackNavigation();
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={goBack}>
        <View style={styles.backButton}>
          <FontAwesomeIcon name="chevron-left" color={colors.primaryBg} />
          <Avatar
            containerStyle={styles.avatar}
            source={{ uri: event?.image }}
            rounded
            size={40}
          />
          <Text style={textStyles.liveName}>{event?.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StreamerHeader;
