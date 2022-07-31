import React from 'react';
// Dependencies
import { Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
// Customs Dependencies
import defaultStyles from '../config/styles';
// Main function
function AppText({ children, style, custom = false, ...otherProps }) {
  if (custom) return <Text style={[defaultStyles.text, style]}>{children}</Text>;
  return (
    <Text style={style} {...otherProps}>
      {children}
    </Text>
  );
}
AppText.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  custom: PropTypes.bool,
};

export default AppText;
