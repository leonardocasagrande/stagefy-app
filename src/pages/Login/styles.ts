import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 32,
    paddingVertical: 48,
    backgroundColor: colors.primaryBg,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
  },
  form: {
    marginTop: 48,
    flex: 1,
  },
  title: {
    marginBottom: 36,
  },
  button: {
    marginTop: 'auto',
    width: 160,
    alignSelf: 'center',
  },
  loginText: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default styles;
