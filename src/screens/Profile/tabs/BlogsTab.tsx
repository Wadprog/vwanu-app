import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '@ui-kitten/components'

import tw from 'lib/tailwind'
import Text from 'components/Text'
import { TabContentProps } from '../types'

/**
 * Blogs Tab Component
 * Displays list of blog posts authored by the user
 */
const BlogsTab: React.FC<TabContentProps> = ({ targetUserId, navigation }) => {
  // Mock data - in a real app, this would come from an API
  const mockBlogs = [
    {
      id: 1,
      title: 'My Journey into Mobile Development',
      excerpt:
        'How I transitioned from web development to creating mobile applications with React Native...',
      readTime: '5 min read',
      publishedAt: '2024-01-15',
      tags: ['React Native', 'Mobile', 'Development'],
      views: 1250,
      likes: 45,
    },
    {
      id: 2,
      title: 'Building Better User Interfaces',
      excerpt:
        'Best practices for creating intuitive and accessible user interfaces that users love...',
      readTime: '8 min read',
      publishedAt: '2024-01-10',
      tags: ['UI/UX', 'Design', 'Accessibility'],
      views: 890,
      likes: 32,
    },
    {
      id: 3,
      title: 'The Future of Social Media',
      excerpt:
        'Exploring emerging trends and technologies that will shape the next generation of social platforms...',
      readTime: '12 min read',
      publishedAt: '2024-01-05',
      tags: ['Social Media', 'Technology', 'Future'],
      views: 2100,
      likes: 78,
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const renderBlogItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tw`bg-white dark:bg-gray-800 rounded-lg p-4 mb-4`}
      onPress={() => {
        // TODO: Navigate to blog post detail
        console.log('Navigate to blog post:', item.id)
      }}
    >
      <View style={tw`mb-3`}>
        <Text style={tw`font-bold text-lg mb-2`}>{item.title}</Text>
        <Text style={tw`text-gray-600 dark:text-gray-400 text-sm leading-5`}>
          {item.excerpt}
        </Text>
      </View>

      {/* Tags */}
      <View style={tw`flex-row flex-wrap mb-3`}>
        {item.tags.map((tag: string, index: number) => (
          <View
            key={index}
            style={tw`bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full mr-2 mb-1`}
          >
            <Text style={tw`text-blue-800 dark:text-blue-200 text-xs`}>
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* Meta information */}
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-gray-500 dark:text-gray-500 text-xs mr-3`}>
            {formatDate(item.publishedAt)}
          </Text>
          <Text style={tw`text-gray-500 dark:text-gray-500 text-xs mr-3`}>
            {item.readTime}
          </Text>
        </View>

        <View style={tw`flex-row items-center`}>
          <View style={tw`flex-row items-center mr-3`}>
            <Ionicons name="eye-outline" size={14} color="#9CA3AF" />
            <Text style={tw`text-gray-500 dark:text-gray-500 text-xs ml-1`}>
              {item.views.toLocaleString()}
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Ionicons name="heart-outline" size={14} color="#9CA3AF" />
            <Text style={tw`text-gray-500 dark:text-gray-500 text-xs ml-1`}>
              {item.likes}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={tw`flex-1`}>
      {mockBlogs.length > 0 ? (
        <FlatList
          data={mockBlogs}
          renderItem={renderBlogItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
        />
      ) : (
        <View style={tw`flex-1 justify-center items-center p-8`}>
          <Ionicons name="library-outline" size={64} color="#9CA3AF" />
          <Text style={tw`text-gray-500 mt-4 text-center`}>
            No blog posts yet
          </Text>
          <Text style={tw`text-gray-400 mt-2 text-center text-sm`}>
            Start writing and share your thoughts with the world
          </Text>
          <Button
            style={tw`mt-4`}
            appearance="filled"
            status="primary"
            onPress={() => {
              // TODO: Navigate to blog post creation
              console.log('Navigate to create blog post')
            }}
          >
            Write Your First Post
          </Button>
        </View>
      )}
    </View>
  )
}

export default BlogsTab
