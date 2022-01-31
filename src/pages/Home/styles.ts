import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primaryBg,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  tab: {
    marginRight: 12,
  },
});
