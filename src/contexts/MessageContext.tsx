import React, { createContext, useContext, useReducer, ReactNode } from 'react'

type MessageType = 'warning' | 'info'

interface Message {
  id: string
  type: MessageType
  text: string
}

interface MessageState {
  messages: Message[]
}

type MessageAction =
  | { type: 'ADD_MESSAGE'; payload: Omit<Message, 'id'> }
  | { type: 'REMOVE_MESSAGE'; payload: string }

interface MessageContextType {
  messages: Message[]
  addMessage: (message: string, type: MessageType) => void
  removeMessage: (id: string) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

const messageReducer = (
  state: MessageState,
  action: MessageAction
): MessageState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        messages: [
          ...state.messages,
          { ...action.payload, id: Date.now().toString() },
        ],
      }
    case 'REMOVE_MESSAGE':
      return {
        messages: state.messages.filter((msg) => msg.id !== action.payload),
      }
    default:
      return state
  }
}

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(messageReducer, { messages: [] })

  const addMessage = (text: string, type: MessageType) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { text, type } })
  }

  const removeMessage = (id: string) => {
    dispatch({ type: 'REMOVE_MESSAGE', payload: id })
  }

  return (
    <MessageContext.Provider
      value={{
        messages: state.messages,
        addMessage,
        removeMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export const useMessage = () => {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return context
}
