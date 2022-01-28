import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  content: {
    marginHorizontal: 16,
    flex: 1,
  },
  avatar: {
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 10, height: 0 },
    shadowRadius: 2,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.warningMain,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
