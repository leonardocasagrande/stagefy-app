import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
const styles = StyleSheet.create({
  view: {
    height: 375,
    backgroundColor: colors.primaryBg,
    color: colors.textMain,
    marginTop: 'auto',
    shadowColor: 'black',
    shadowOffset: { height: -5, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: '#00000066',
  },
  bar: {
    width: 146,
    height: 8,
    borderRadius: 50,
    backgroundColor: colors.disabled,
    marginTop: 13,
    marginBottom: 48,
  },
  icon: {
    marginBottom: 36,
  },
  title: {
    marginBottom: 16,
  },
});

export default styles;
