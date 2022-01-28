import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 32,
    paddingVertical: 48,
    backgroundColor: colors.primaryBg,
  },
  image: {
    alignSelf: 'center',
  },
  form: {
    marginTop: 48,
  },
  privacy: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    marginBottom: 36,
  },
  button: {
    marginTop: 16,
    width: 160,
    alignSelf: 'center',
  },
  loginText: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default styles;
