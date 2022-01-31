import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    maxHeight: 40,
    zIndex: 99999,
  },
  button: {
    position: 'absolute',
    top: '50%',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  buttonSwitch: {
    position: 'absolute',
    top: '3%',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  title: {
    marginLeft: 12,
  },
  root: {
    position: 'absolute',
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 16,
  },
  views: {
    backgroundColor: colors.secondaryBg,
    marginLeft: 'auto',
    paddingHorizontal: 6,
    paddingVertical: 6,
    flexDirection: 'row',
    borderRadius: 6,
    alignItems: 'center',
  },
  viewCount: {
    marginLeft: 3,
  },
});
