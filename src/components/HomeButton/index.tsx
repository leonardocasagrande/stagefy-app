import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import textStyles from '../../theme/textStyles';
import styles from './styles';

interface IHomeButtonProps {
  onPress(): void;
  title: string;
  icon: ReactNode;
}

const HomeButton = ({ onPress, title, icon }: IHomeButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.root}>
        {icon}
        <Text style={{ ...textStyles.body2, ...styles.title }}>{title}</Text>
        <FontAwesomeIcon style={styles.icon} icon="chevron-right" />
      </View>
    </TouchableOpacity>
  );
};

export default HomeButton;
