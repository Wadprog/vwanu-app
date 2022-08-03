import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { Error } from './form';

function Screen({ children, loading = false, error = false }) {
  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          <>
            <Error error={error} visible={error} />
            {children}
          </>
        )}
      </SafeAreaView>
    </Layout>
  );
}

Screen.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};
export default Screen;
