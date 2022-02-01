import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    backgroundColor: '#0000004d',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 5,
  },
  icon: {
    marginRight: 3,
  },
  viewCountContainer: { top: 80, position: 'absolute', paddingHorizontal: 20 },
  endButton: {
    backgroundColor: colors.warningMain,
  },
});
