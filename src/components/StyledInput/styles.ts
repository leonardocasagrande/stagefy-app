import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
const styles = StyleSheet.create({
  label: {
    color: colors.textLight,
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 16,
    lineHeight: 27,
    fontWeight: 'normal',
  },
  error: {
    color: colors.errorMain,
  },
  containerStyle: {
    paddingHorizontal: 0,
  },
  inputStyle: {
    padding: 0,
  },
});

export default styles;
