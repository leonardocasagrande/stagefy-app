import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Button } from 'react-native-elements';
import textStyles from '../../theme/textStyles';
import styles from './styles';

interface IIconButtonProps {
  onPress(): void;
  icon: IconProp;
  title: string;
}

const IconButton = ({ onPress, icon, title }: IIconButtonProps) => {
  return (
    <Button
      title={title}
      icon={<FontAwesomeIcon icon={icon} />}
      onPress={onPress}
      buttonStyle={styles.button}
      titleStyle={{ ...textStyles.homeButton, ...styles.title }}
    />
  );
};

export default IconButton;
