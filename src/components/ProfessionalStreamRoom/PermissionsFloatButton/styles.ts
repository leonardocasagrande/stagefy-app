import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 24,
    bottom: '20%',
    height: 48,
    width: 48,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
});

export default styles;
