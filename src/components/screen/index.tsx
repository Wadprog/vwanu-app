import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Layout } from '@ui-kitten/components'
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { StyleSheet, TouchableOpacity } from 'react-native'
import isNil from 'lodash/isNil'

import Text from '../Text'
import tw from '../../lib/tailwind'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface ErrorProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
  retryText?: string
}

export interface ScreenProps {
  children: React.ReactNode
  loadinScreen?: React.ReactNode
  loading?: boolean
  error?: ErrorProps | null
}

const Screen: React.FC<ScreenProps> = ({
  loading = false,
  children,
  error,
  loadinScreen,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = ['25%']
  useEffect(() => {
    if (!isNil(error)) {
      if (error && !error.onRetry && !error.onDismiss) {
        throw new Error(
          'Error component must have either onRetry or onDismiss function'
        )
      }
      setTimeout(() => {
        bottomSheetRef.current?.expand()
      }, 100) // Ensure it opens on mount
    } // Open bottom sheet when there's an error
  }, [error])

  return (
    <Layout style={tw`flex-1 `}>
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <>
            {loadinScreen ? (
              loadinScreen
            ) : (
              <View style={tw`flex-1 items-center justify-center bg-accent`}>
                <ActivityIndicator animating={loading} />
              </View>
            )}
          </>
        ) : (
          children
        )}
      </SafeAreaView>
      {/* Bottom Sheet for Error Display */}
      <GestureHandlerRootView style={{ backgroundColor: 'red' }}>
        {/* @ts-ignore */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={false}
          // @ts-ignore
          backdropComponent={(props) => (
            // @ts-ignore
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="none"
            />
          )}
          handleComponent={null}
        >
          {/* @ts-ignore */}
          <BottomSheetView style={styles.bottomSheetContent}>
            <Text style={styles.errorText}>{error?.message}</Text>

            {/* Retry Button - only show if there's a retry function */}
            {error?.onRetry && (
              <TouchableOpacity
                style={styles.retryButton}
                onPress={error.onRetry}
              >
                <Text style={styles.retryButtonText}>
                  {error.retryText || 'Retry'}
                </Text>
              </TouchableOpacity>
            )}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </Layout>
  )
}

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  loadinScreen: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func as PropTypes.Requireable<() => void>,
    onDismiss: PropTypes.func as PropTypes.Requireable<() => void>,
    retryText: PropTypes.string,
  }) as PropTypes.Validator<ErrorProps | null | undefined>,
}

export default Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  bottomSheetContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: -5,
    elevation: 5, // Shadow effect for Android
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Adds shadow on Android
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
})
