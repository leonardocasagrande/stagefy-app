import { StyleSheet } from 'react-native';
import colors from '../../../../theme/colors';

const styles = StyleSheet.create({
  topContent: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatarLeft: {
    marginRight: -8,
    borderColor: 'red',
    borderWidth: 3,
  },
  avatarRight: {
    marginLeft: -8,
    borderColor: 'red',
    borderWidth: 3,
  },
  modalContent: {
    paddingHorizontal: 12,
  },
  modalText: {
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  cancelButton: {
    color: colors.errorMain,
  },
  button: {
    backgroundColor: colors.warningMain,
  },
});

export default styles;
