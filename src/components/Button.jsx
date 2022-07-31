import React from 'react';

// Dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Custom dependencies
import colors from '../config/colors';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 5,
  },
  text: {
    color: colors.white,
    marginLeft: 2,
  },
});
function Button(props) {
  const { icon = null, title, color = 'primary', onPress, style } = props;
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, { ...style }]}
      onPress={onPress}
    >
      <Wrapper>
        {icon && <MaterialCommunityIcons {...icon} size={20} />}
        <Text style={styles.text}>{title}</Text>
      </Wrapper>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
};
export default Button;
