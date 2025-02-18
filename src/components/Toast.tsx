import React, { useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Text from './Text'
import tw from '../lib/tailwind'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  type?: ToastType
  message: string
  onDismiss?: () => void
  onRetry?: () => void
  duration?: number
  position?: 'top' | 'bottom'
  autoDismiss?: boolean
}

const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  onDismiss,
  onRetry,
  duration = 3000,
  position = 'bottom',
  autoDismiss = true,
}) => {
  const translateY = new Animated.Value(position === 'top' ? -100 : 100)
  const fadeAnim = new Animated.Value(0)

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.()
    })
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()

    if (autoDismiss && !onRetry) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [])

  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle'
      case 'error':
        return 'alert-circle'
      case 'warning':
        return 'warning'
      default:
        return 'information-circle'
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return tw`bg-green-500`
      case 'error':
        return tw`bg-red-500`
      case 'warning':
        return tw`bg-yellow-500`
      default:
        return tw`bg-blue-500`
    }
  }

  return (
    <>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.backdrop,
          { opacity: fadeAnim },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleDismiss} />
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          getBackgroundColor(),
          position === 'top' ? styles.topPosition : styles.bottomPosition,
          { transform: [{ translateY }], opacity: fadeAnim },
        ]}
      >
        <View style={tw`flex-row items-center`}>
          <Ionicons
            name={getIconName()}
            size={24}
            color="white"
            style={tw`mr-2`}
          />
          <Text style={tw`flex-1 text-white`}>{message}</Text>
          {onRetry && (
            <TouchableOpacity onPress={onRetry} style={tw`ml-2 mr-2`}>
              <Text style={tw`text-white font-bold`}>Retry</Text>
            </TouchableOpacity>
          )}
          {(!autoDismiss || !onDismiss) && (
            <TouchableOpacity onPress={handleDismiss} style={tw`ml-2`}>
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 999,
  },
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  topPosition: {
    top: 16,
  },
  bottomPosition: {
    bottom: 16,
  },
})

export default Toast
