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
  // onBottomNavVisibilityChange?: (isVisible: boolean) => void
  isFetching: boolean
  // onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  initialData: { data: T[]; total: number }
  fetchData: (
    pagination: PaginationState
  ) => Promise<{ data: T[]; total?: number }>
  initialLimit?: number
}

function PaginatedList<T>({
  // onBottomNavVisibilityChange,
  isFetching,
  // onScroll,
  initialData,
  fetchData,
  initialLimit = 10,
  ...flatListProps
}: PaginatedListProps<T>) {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledUp, setHasScrolledUp] = useState(false)
  const [data, setData] = useState<T[]>(initialData.data)
  const [hasMore, setHasMore] = useState(
    initialData.total > initialData.data.length
  )
  const [pagination, setPagination] = useState<PaginationState>({
    limit: initialLimit,
    skip: initialData.data.length || 0,
  })

  const loadData = async (
    newPagination: PaginationState,
    isRefresh = false
  ) => {
    try {
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
    }
  }

  const handleLoadMore = () => {
    if (!isFetching && hasMore && hasScrolledUp) {
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

  const handleScrollEvent = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const currentScrollY = event.nativeEvent.contentOffset.y

    // Determine scroll direction and toggle bottom nav visibility
    if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
      const isScrollingUp = currentScrollY < lastScrollY
      //onBottomNavVisibilityChange?.(currentScrollY < lastScrollY)
      // Set hasScrolledUp to true when user scrolls up for the first time
      if (isScrollingUp && !hasScrolledUp) {
        setHasScrolledUp(true)
      }

      setLastScrollY(currentScrollY)
    }

    // Call original onScroll if provided
    // onScroll?.(event)
  }

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
        isFetching ? (
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
