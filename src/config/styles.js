import { Platform } from 'react-native';
// Custom dependencies
import colors from './colors';

export default {
  colors,
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  my_1: {
    marginVertical: 15,
  },
};
