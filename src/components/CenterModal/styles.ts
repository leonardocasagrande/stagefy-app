import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.primaryBg,
    color: colors.textMain,
    alignItems: 'center',
    borderRadius: 32,
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 56,
    maxWidth: 300,
  },
  modal: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 36,
  },
  title: {
    marginBottom: 32,
  },
  description: {
    marginBottom: 24,
  },
});

export default styles;
