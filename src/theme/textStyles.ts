import { StyleSheet } from 'react-native';
import colors from './colors';

const textStyles = StyleSheet.create({
  IntroHeading: {
    fontFamily: 'BalooBhaijaan-Regular',
    color: colors.primaryMain,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.727273,
    textTransform: 'uppercase',
  },
  body: {
    fontFamily: 'BalooBhaijaan2-Regular',
    color: colors.textMain,
    fontSize: 12,
    lineHeight: 21,
  },
  button: {
    textTransform: 'uppercase',
    fontFamily: 'BalooBhaijaan-Regular',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.73,
  },
});

export default textStyles;
