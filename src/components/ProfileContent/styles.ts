import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
const styles = StyleSheet.create({
  screen: {
    paddingVertical: 48,
    backgroundColor: colors.primaryBg,
    flex: 1,
  },
  info: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    marginRight: 16,
  },
  actions: {
    marginLeft: 64,
    marginRight: 40,
    marginTop: 40,
  },
  bottom: {
    marginTop: 'auto',
    flexDirection: 'row',
    marginHorizontal: 32,
    justifyContent: 'space-between',
  },
});

export default styles;
