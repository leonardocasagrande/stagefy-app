import { Theme } from 'react-native-elements';
import colors from './colors';
import textStyles from './textStyles';

const theme: Theme = {
  colors: {
    primary: colors.secondaryMain,
    secondary: colors.primaryMain,
    success: colors.successMain,
    error: colors.errorMain,
    warning: colors.warningMain,
  },
  Button: {
    buttonStyle: {
      borderRadius: 5,
    },
    titleProps: {},
    titleStyle: textStyles.button,
  },
};

export default theme;
