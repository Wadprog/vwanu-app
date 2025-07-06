import React, { useState, useEffect } from 'react'
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ActivityIndicator,
  View,
} from 'react-native'
import tw from '../../lib/tailwind'

const SCROLL_THRESHOLD = 10

interface PaginationState {
  limit: number
  skip: number
}
export interface PaginationParams {
  limit: number
  skip: number
}
interface PaginatedListProps<T>
  extends Omit<FlatListProps<T>, 'onScroll' | 'data'> {
  onBottomNavVisibilityChange?: (isVisible: boolean) => void
  isFetching?: boolean
  isLoading?: boolean
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  LoadingComponent?: React.ReactElement
  data?: T[]
  fetchData: (
    pagination: PaginationState
  ) => Promise<{ data: T[]; total?: number }>
  initialLimit?: number
}

function PaginatedList<T>({
  onBottomNavVisibilityChange,
  isFetching: externalIsFetching,
  isLoading: externalIsLoading,
  onScroll,
  LoadingComponent,
  data: externalData,
  fetchData,
  initialLimit = 10,
  ...flatListProps
}: PaginatedListProps<T>) {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [data, setData] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    limit: initialLimit,
    skip: 0,
  })

  const loadData = async (
    newPagination: PaginationState,
    isRefresh = false
  ) => {
    try {
      setIsFetching(true)
      const response = await fetchData(newPagination)

      if (isRefresh) {
        setData(response.data)
      } else {
        setData((prev) => [...prev, ...response.data])
      }

      setHasMore(response.data.length >= newPagination.limit)
      setPagination(newPagination)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      const newPagination = {
        ...pagination,
        skip: pagination.skip + pagination.limit,
      }
      loadData(newPagination)
    }
  }

  const handleRefresh = () => {
    if (!isFetching) {
      const newPagination = {
        ...pagination,
        skip: 0,
      }
      loadData(newPagination, true)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    loadData(pagination).finally(() => setIsLoading(false))
  }, []) // Initial load

  const handleScrollEvent = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const currentScrollY = event.nativeEvent.contentOffset.y

    // Determine scroll direction and toggle bottom nav visibility
    if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
      onBottomNavVisibilityChange?.(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    // Call original onScroll if provided
    onScroll?.(event)
  }

  if ((isLoading || externalIsLoading) && !data.length && LoadingComponent) {
    return LoadingComponent
  }

  // onEndReachedThreshold={0.5}
  // onScroll={(e) => {
  //   handleScroll2(e)
  //   handleScroll(e)
  // }}
  return (
    <FlatList
      {...flatListProps}
      data={data}
      onScroll={handleScrollEvent}
      scrollEventThrottle={16}
      refreshing={isFetching && pagination.skip === 0}
      onRefresh={handleRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        (isFetching || externalIsFetching) && pagination.skip > 0 ? (
          <View style={tw`py-4`}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : hasMore ? (
          <View style={tw`py-4`} />
        ) : null
      }
    />
  )
}

export default PaginatedList
