import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
// Custom dependencies
import colors from '../../config/colors';
import Text from '../Text';

// Styles
const styles = StyleSheet.create({
  error: {
    color: colors.danger,
  },
});
function FormError({ error, visible }) {
  if (!visible || !error) return null;
  return <Text style={styles.error}>{error}</Text>;
}

FormError.propTypes = {
  error: PropTypes.string,
  visible: PropTypes.bool,
};
export default FormError;
