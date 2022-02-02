import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import textStyles from '../../theme/textStyles';
import styles from './styles';
import colors from '../../theme/colors';

interface IBackHeaderProps {
  title: string;
  onGoBack(): void;
}

const BackHeader = ({ title, onGoBack }: IBackHeaderProps) => {
  return (
    <TouchableOpacity onPress={onGoBack}>
      <View style={styles.root}>
        <FontAwesomeIcon
          color={colors.textMain}
          style={styles.icon}
          name="chevron-left"
        />
        <Text style={textStyles.navigateText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackHeader;
