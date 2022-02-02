import React from 'react';
import { Button } from 'react-native-elements';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import textStyles from '../../theme/textStyles';
import styles from './styles';

interface IIconButtonProps {
  onPress(): void;
  icon: IconNode;
  title: string;
}

const IconButton = ({ onPress, icon, title }: IIconButtonProps) => {
  return (
    <Button
      title={title}
      icon={icon}
      onPress={onPress}
      buttonStyle={styles.button}
      titleStyle={{ ...textStyles.homeButton, ...styles.title }}
    />
  );
};

export default IconButton;
