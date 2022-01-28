import React from 'react';
import { Input, InputProps } from 'react-native-elements';
import colors from '../../theme/colors';
import textStyles from '../../theme/textStyles';
import styles from './styles';

interface IStyledInputProps extends InputProps {
  helperMessage?: string;
}

const StyledInput = (props: IStyledInputProps) => {
  return (
    <Input
      {...props}
      errorMessage={props.errorMessage || props.helperMessage}
      labelStyle={styles.label}
      errorStyle={
        props.errorMessage ? textStyles.helperError : textStyles.helper
      }
      placeholderTextColor={colors.disabled}
      containerStyle={styles.containerStyle}
      inputStyle={styles.inputStyle}
    />
  );
};

export default StyledInput;
