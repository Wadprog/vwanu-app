import { Platform } from 'react-native';
import tw from '../lib/tailwind';

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
  input: tw`bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200`,
};
