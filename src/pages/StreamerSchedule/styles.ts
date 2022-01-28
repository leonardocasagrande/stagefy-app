import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
const styles = StyleSheet.create({
  screen: {
    paddingVertical: 48,
    backgroundColor: colors.primaryBg,
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  avatar: {
    marginRight: 16,
  },
  list: {
    marginHorizontal: 24,
  },
});

export default styles;
