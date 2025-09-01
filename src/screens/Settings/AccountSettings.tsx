/**
 * Account Settings Screen
 * Manage account information, password, and account-related preferences
 */
import React from 'react'
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

import tw from '../../lib/tailwind'
import Text from '../../components/Text'
import Screen from '../../components/screen'
import { useTheme } from '../../hooks/useTheme'
import { RootState } from '../../store'

interface AccountOption {
  id: string
  title: string
  subtitle: string
  icon: string
  onPress: () => void
  showChevron?: boolean
  dangerous?: boolean
}

const AccountSettings: React.FC = () => {
  const navigation = useNavigation()
  const { isDarkMode } = useTheme()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen or show modal
    Alert.alert('Change Password', 'This feature will be implemented soon.')
  }

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    Alert.alert('Edit Profile', 'This feature will be implemented soon.')
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement account deletion
            Alert.alert(
              'Account Deletion',
              'This feature will be implemented soon.'
            )
          },
        },
      ]
    )
  }

  const handleExportData = () => {
    Alert.alert('Export Data', 'This feature will be implemented soon.')
  }

  const accountOptions: AccountOption[] = [
    {
      id: 'edit_profile',
      title: 'Edit Profile',
      subtitle: 'Update your profile information',
      icon: 'person-outline',
      onPress: handleEditProfile,
      showChevron: true,
    },
    {
      id: 'change_password',
      title: 'Change Password',
      subtitle: 'Update your account password',
      icon: 'lock-closed-outline',
      onPress: handleChangePassword,
      showChevron: true,
    },
    {
      id: 'export_data',
      title: 'Export Data',
      subtitle: 'Download a copy of your data',
      icon: 'download-outline',
      onPress: handleExportData,
      showChevron: true,
    },
    {
      id: 'delete_account',
      title: 'Delete Account',
      subtitle: 'Permanently delete your account',
      icon: 'trash-outline',
      onPress: handleDeleteAccount,
      showChevron: false,
      dangerous: true,
    },
  ]

  const renderAccountOption = (option: AccountOption) => (
    <TouchableOpacity
      key={option.id}
      onPress={option.onPress}
      style={tw`flex-row items-center p-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
    >
      {/* Icon */}
      <View
        style={tw`w-10 h-10 rounded-full ${
          option.dangerous
            ? isDarkMode
              ? 'bg-red-900'
              : 'bg-red-100'
            : isDarkMode
            ? 'bg-blue-900'
            : 'bg-blue-100'
        } items-center justify-center mr-3`}
      >
        <Ionicons
          name={option.icon as any}
          size={20}
          color={
            option.dangerous
              ? isDarkMode
                ? '#F87171'
                : '#DC2626'
              : isDarkMode
              ? '#60A5FA'
              : '#2563EB'
          }
        />
      </View>

      {/* Content */}
      <View style={tw`flex-1`}>
        <Text
          style={tw`font-semibold ${
            option.dangerous
              ? isDarkMode
                ? 'text-red-400'
                : 'text-red-600'
              : ''
          }`}
        >
          {option.title}
        </Text>
        <Text
          style={tw`text-sm mt-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {option.subtitle}
        </Text>
      </View>

      {/* Chevron */}
      {option.showChevron && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isDarkMode ? '#9CA3AF' : '#6B7280'}
        />
      )}
    </TouchableOpacity>
  )

  return (
    <Screen>
      <View style={tw`flex-1`}>
        {/* Header */}
        <View
          style={tw`flex-row items-center p-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`mr-3`}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold`}>Account</Text>
        </View>

        <ScrollView style={tw`flex-1`}>
          {/* Current Account Info */}
          <View
            style={tw`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <Text style={tw`font-semibold text-lg mb-2`}>
              Account Information
            </Text>
            <View style={tw`mb-2`}>
              <Text
                style={tw`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Full Name
              </Text>
              <Text style={tw`font-medium`}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
            <View style={tw`mb-2`}>
              <Text
                style={tw`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Email
              </Text>
              <Text style={tw`font-medium`}>{user?.email}</Text>
            </View>
            <View>
              <Text
                style={tw`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Member Since
              </Text>
              <Text style={tw`font-medium`}>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'N/A'}
              </Text>
            </View>
          </View>

          {/* Account Actions */}
          <View style={tw`mt-4`}>
            <Text
              style={tw`px-4 pb-2 font-semibold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              ACCOUNT MANAGEMENT
            </Text>
            {accountOptions.map(renderAccountOption)}
          </View>

          {/* Warning Section */}
          <View
            style={tw`mt-6 p-4 mx-4 ${
              isDarkMode ? 'bg-red-900' : 'bg-red-50'
            } rounded-lg`}
          >
            <View style={tw`flex-row items-start`}>
              <Ionicons
                name="warning-outline"
                size={20}
                color={isDarkMode ? '#F87171' : '#DC2626'}
                style={tw`mr-2 mt-0.5`}
              />
              <View style={tw`flex-1`}>
                <Text
                  style={tw`font-semibold text-sm ${
                    isDarkMode ? 'text-red-200' : 'text-red-800'
                  }`}
                >
                  Important
                </Text>
                <Text
                  style={tw`text-sm mt-1 ${
                    isDarkMode ? 'text-red-300' : 'text-red-700'
                  }`}
                >
                  Deleting your account will permanently remove all your data,
                  including posts, comments, and connections. This action cannot
                  be undone.
                </Text>
              </View>
            </View>
          </View>

          <View style={tw`h-20`} />
        </ScrollView>
      </View>
    </Screen>
  )
}

export default AccountSettings
