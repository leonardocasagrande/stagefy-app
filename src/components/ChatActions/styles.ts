import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    // height: 60,
    // backgroundColor: '#0E0D0D',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal: 24,
  },
  input: {
    width: '100%',
    height: 34,
    padding: 6,
    paddingHorizontal: 24,
    backgroundColor: colors.secondaryBg,
    borderRadius: 50,
    color: '#000000',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  buttonText: {
    padding: 10,
    color: '#000',
  },
  giftImage: {
    width: 25,
    height: 25,
  },
});
