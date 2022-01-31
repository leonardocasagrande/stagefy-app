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
  title: {
    fontFamily: 'BalooBhaijaan2-Bold',
    fontSize: 18,
    lineHeight: 31,
    letterSpacing: 0.73,
    color: colors.secondaryMain,
  },
  homeButton: {
    fontFamily: 'BalooBhaijaan-SemiBold',
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.73,
    color: colors.textMain,
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
  navigateText: {
    color: colors.textMain,
    fontFamily: 'BalooBhaijaan2-Medium',
    fontSize: 18,
    lineHeight: 31,
    letterSpacing: 0.73,
    textTransform: 'uppercase',
  },
  homeTab: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.73,
    color: colors.textMain,
    textTransform: 'uppercase',
  },
  homeActiveTab: {
    fontFamily: 'BalooBhaijaan2-Medium',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.73,
    textTransform: 'uppercase',
    color: colors.primaryMain,
  },
  liveSubtitle: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 12,
    lineHeight: 21,
    color: colors.secondaryBg,
  },
  liveName: {
    fontFamily: 'BalooBhaijaan2-Medium',
    fontSize: 18,
    lineHeight: 31,
    letterSpacing: 0.73,
    textTransform: 'uppercase',
    color: colors.secondaryBg,
  },
  liveNameStarted: {
    fontFamily: 'BalooBhaijaan2-Medium',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.73,
    textTransform: 'uppercase',
    color: colors.secondaryBg,
  },
  liveSubtitleStarted: {
    fontFamily: 'BalooBhaijaan2-Medium',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.73,
    textTransform: 'uppercase',
    color: colors.secondaryBg,
  },
  viewCount: {
    fontFamily: 'WorkSans-Regular',
    color: colors.primaryMain,
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.16,
  },
  h3White: {
    fontFamily: 'BalooBhaijaan-Regular',
    color: colors.brandWhite,
    letterSpacing: 0.73,
    fontSize: 16,
    lineHeight: 24,
    textTransform: 'uppercase',
  },
  viewCountWhite: {
    fontFamily: 'WorkSans-Regular',
    color: colors.primaryBg,
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.16,
  },
  messageName: {
    fontFamily: 'BalooBhaijaan2-Bold',
    color: colors.secondaryBg,
    fontSize: 12,
    lineHeight: 21,
  },
  messageContent: {
    fontFamily: 'BalooBhaijaan2-Bold',
    color: colors.secondaryBg,
    fontSize: 10,
    lineHeight: 17,
  },
});

export default textStyles;
