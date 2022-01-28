import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import textStyles from '../../theme/textStyles';
import styles from './styles';

interface IBackHeaderProps {
  title: string;
  onGoBack(): void;
}

const BackHeader = ({ title, onGoBack }: IBackHeaderProps) => {
  return (
    <TouchableOpacity onPress={onGoBack}>
      <View style={styles.root}>
        <FontAwesomeIcon style={styles.icon} icon="chevron-left" />
        <Text style={textStyles.navigateText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackHeader;
