import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React, { ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import textStyles from '../../theme/textStyles';
import styles from './styles';
import colors from '../../theme/colors';

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
        <FontAwesomeIcon
          color={colors.textMain}
          style={styles.icon}
          name="chevron-right"
        />
      </View>
    </TouchableOpacity>
  );
};

export default HomeButton;
