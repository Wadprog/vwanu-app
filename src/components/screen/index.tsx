import PropTypes from 'prop-types'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import tw from '../../lib/tailwind'
import Toast from '../Toast'
import DefaultPageLoading from './components/PageLoading'
import { useMessage } from 'contexts/MessageContext'

interface ErrorProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
  retryText?: string
}

export interface ScreenProps {
  children: React.ReactNode
  loadingScreen?: React.ReactNode
  loading?: boolean
  error?: ErrorProps | string | null
  showToast?: boolean
  safeArea?: boolean
}

const Screen: React.FC<ScreenProps> = ({
  loading = false,
  children,
  error,
  loadingScreen,
  showToast = true,
  safeArea = true,
}) => {
  const { messages, removeMessage } = useMessage()

  return (
    <Layout style={tw`flex-1`}>
      {loading ? (
        <>{loadingScreen ? loadingScreen : <DefaultPageLoading />}</>
      ) : (
        <>
          {safeArea ? (
            <SafeAreaView style={tw`flex-1`}>
              {messages?.map((msg, index) => (
                <Toast
                  key={index}
                  type={msg.type || 'info'}
                  message={msg.text}
                  position="top"
                  autoDismiss={true}
                  onDismiss={() => removeMessage(msg.id)}
                />
              ))}
              {children}
            </SafeAreaView>
          ) : (
            <>
              {messages?.map((msg, index) => (
                <Toast
                  key={index}
                  type={msg.type || 'info'}
                  message={msg.text}
                  position="top"
                  autoDismiss={true}
                  onDismiss={() => removeMessage(msg.id)}
                />
              ))}
              {children}
            </>
          )}
        </>
      )}

      {showToast && error && (
        <Toast
          type="error"
          message={typeof error === 'string' ? error : error.message}
          onRetry={typeof error !== 'string' ? error.onRetry : undefined}
          onDismiss={typeof error !== 'string' ? error.onDismiss : undefined}
          position="bottom"
          autoDismiss={false}
        />
      )}
    </Layout>
  )
}

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  loadingScreen: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func as PropTypes.Requireable<() => void>,
    onDismiss: PropTypes.func as PropTypes.Requireable<() => void>,
    retryText: PropTypes.string,
  }) as PropTypes.Validator<ErrorProps | null | undefined>,
  showToast: PropTypes.bool,
}

export default Screen
