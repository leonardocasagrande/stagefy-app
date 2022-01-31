import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '48%',
    marginTop: 16,
  },
  image: {
    flex: 1,
    height: 190,
    borderRadius: 12,
    overflow: 'hidden',
  },
  textWrapper: {
    flexDirection: 'row',
    backgroundColor: '#000000B3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 'auto',
    justifyContent: 'space-between',
  },
  viewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
});

export default styles;
