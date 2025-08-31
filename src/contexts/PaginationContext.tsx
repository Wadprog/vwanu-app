import React, { createContext, useContext, useState, useCallback } from 'react'

interface PaginationState {
  page: number
  limit: number
  skip: number
  hasMore: boolean
}

interface PaginationContextType {
  pagination: PaginationState
  loadMore: () => void
  resetPagination: () => void
  setHasMore: (hasMore: boolean) => void
}

const defaultPaginationState: PaginationState = {
  page: 1,
  limit: 10,
  skip: 0,
  hasMore: true,
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
)

export const usePagination = () => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider')
  }
  return context
}

interface PaginationProviderProps {
  children: React.ReactNode
  initialLimit?: number
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
  initialLimit = 10,
}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    ...defaultPaginationState,
    limit: initialLimit,
  })

  const loadMore = useCallback(() => {
    console.log('loadMore')
    console.log('pagination', pagination)
    if (!pagination.hasMore) return

    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
      skip: prev.skip + prev.limit,
    }))
  }, [pagination.hasMore])

  const resetPagination = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
      skip: 0,
      hasMore: true,
    }))
  }, [])

  const setHasMore = useCallback((hasMore: boolean) => {
    setPagination((prev) => ({
      ...prev,
      hasMore,
    }))
  }, [])

  return (
    <PaginationContext.Provider
      value={{
        pagination,
        loadMore,
        resetPagination,
        setHasMore,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}
