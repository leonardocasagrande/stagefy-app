import { StyleSheet } from 'react-native';
import colors from '../../../../theme/colors';

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  confirmButton: {
    backgroundColor: colors.successMain,
    marginRight: 12,
  },
  cancelButton: {
    backgroundColor: colors.errorMain,
  },
  content: {
    height: 220,
  },
});

export default styles;
