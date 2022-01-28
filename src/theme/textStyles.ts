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
  header1: {
    fontFamily: 'BalooBhaijaan-Regular',
    color: colors.textMain,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.727273,
    textTransform: 'uppercase',
  },
  header2: {
    fontFamily: 'BalooBhaijaan-Regular',
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 0.73,
    textTransform: 'uppercase',
    color: colors.textLight,
  },
  label: {
    fontFamily: 'BalooBhaijaan2-Regular',
    color: colors.textMain,
    fontSize: 14,
    lineHeight: 18,
  },
  labelPrimary: {
    fontFamily: 'BalooBhaijaan2-Regular',
    color: colors.primaryMain,
    fontSize: 14,
    lineHeight: 18,
  },
  body: {
    fontFamily: 'BalooBhaijaan2-Regular',
    color: colors.textMain,
    fontSize: 12,
    lineHeight: 21,
  },
  body2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    color: colors.textMain,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyPrimary: {
    fontFamily: 'BalooBhaijaan2-Regular',
    color: colors.primaryMain,
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
  caption: {
    fontSize: 12,
    fontFamily: 'BalooBhaijaan2-Regular',
    textTransform: 'uppercase',
    lineHeight: 21,
  },
  captionSecondary: {
    fontSize: 12,
    fontFamily: 'BalooBhaijaan2-Regular',
    textTransform: 'uppercase',
    lineHeight: 21,
    color: colors.secondaryMain,
  },
  helper: {
    color: colors.textLight,
    fontSize: 12,
    lineHeight: 21,
    fontFamily: 'BalooBhaijaan2-Regular',
  },
  helperError: {
    color: colors.errorMain,
    fontSize: 12,
    lineHeight: 21,
    fontFamily: 'BalooBhaijaan2-Regular',
  },
});

export default textStyles;
