import { FlatList, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

// Custom dependencies
import Error from './Error';
import AddToNetwork from '../AddToNetwork';

const MultiImageSelector = ({ name, items, ...otherProps }) => {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  const handleChange = (type, item) => {
    let valueArray = [];
    if (type === 'add') {
      valueArray = values[name].includes(item.id)
        ? values[name]
        : [...values[name], item.id];
    }
    if (type === 'remove') {
      valueArray = values[name].filter((id) => id !== item.id);
    }
    return valueArray;
  };
  return (
    <>
      <View>
        <FlatList
          contentContainerStyle={{ padding: 1, BackgroundColor: 'red' }}
          numColumns={3}
          // horizontal={false}
          data={items}
          keyExtractor={(item) => item.id.toString()}
          refreshing
          renderItem={({ item }) => (
            <AddToNetwork
              onRemove={(p) => setFieldValue(name, handleChange('remove', p))}
              onAdd={(p) => setFieldValue(name, handleChange('add', p))}
              user={item}
              selected={values[name].includes(item.id)}
            />
          )}
          {...otherProps}
        />
      </View>

      <Error error={errors[name]} visible={touched[name]} />
    </>
  );
};

MultiImageSelector.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default MultiImageSelector;
