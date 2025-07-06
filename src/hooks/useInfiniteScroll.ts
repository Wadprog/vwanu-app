import { useCallback } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { usePagination } from '../contexts/PaginationContext'

interface UseInfiniteScrollOptions {
  threshold?: number
  onLoadMore?: () => void
}

export const useInfiniteScroll = (options: UseInfiniteScrollOptions = {}) => {
  const { threshold = 0.8, onLoadMore } = options
  const { loadMore, pagination } = usePagination()

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent

      const paddingToBottom = contentSize.height * (1 - threshold)

      if (
        layoutMeasurement.height + contentOffset.y >= paddingToBottom &&
        pagination.hasMore
      ) {
        loadMore()
        onLoadMore?.()
      }
    },
    [threshold, pagination.hasMore, loadMore, onLoadMore]
  )

  return {
    handleScroll,
    pagination,
  }
}
