import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.secondaryBg,
    opacity: 0.9,
    shadowColor: colors.textMain,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    height: 65,
  },
});

export default styles;
