import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: colors.primaryBg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  card: {
    marginVertical: 24,
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: colors.cardBg,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    borderRadius: 12,
  },
  titleWrapper: {
    marginBottom: 36,
  },
  buttonWrapper: {
    maxWidth: 204,
    alignSelf: 'center',
    width: '100%',
  },
});
