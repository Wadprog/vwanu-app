/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
// Dependencies
import React from 'react'
import { useSelector } from 'react-redux'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Avatar, Drawer, TouchableRipple } from 'react-native-paper'

import { Toggle, Text } from '@ui-kitten/components'
// import { ThemeContext } from '../config/theme-context'

// import Screen from 'components/Screen'
// Customs imports
// import Screen from '../components/Screen'
import { useFetchProfileQuery } from '../store/profiles'
import { RootState } from '../store'
import routes from '../navigation/routes'
import { signOutUser } from 'store/auth-slice'
// Main Function to Return

// Styles
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
const DrawerContent = (props: DrawerContentComponentProps) => {
  // Hooks
  const { userId } = useSelector((state: RootState) => state.auth)
  const { data: auth, isLoading, error } = useFetchProfileQuery(userId!)
  //   const dispatch = useDispatch()
  //   const themeContext = React.useContext(ThemeContext)
  // Main Object
  // loading={isLoading} error={error ? 'Failed to load profile' : null}
  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: auth?.profilePicture,
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Text category="h6">{auth?.firstName}</Text>
                <Text category="s1">{auth?.lastName}</Text>
              </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Text> {String(auth?.amountOfFollower || 0)} </Text>
              <Text> Following</Text>
              <Text> {String(auth?.amountOfFollowing || 0)} </Text>
              <Text> Followers</Text>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account" color={color} size={size} />
              )}
              label="My account"
              onPress={() => {
                props.navigation.navigate(routes.ACCOUNT)
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="chart-timeline-variant" color={color} size={size} />
              )}
              label="Timeline"
              onPress={() => {
                props.navigation.navigate(routes.TIMELINE)
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="inbox" color={color} size={size} />
              )}
              label="Inbox"
              onPress={() => {
                props.navigation.navigate(routes.INBOX)
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-group" color={color} size={size} />
              )}
              label="Groups"
              onPress={() => {
                props.navigation.navigate(routes.GROUP)
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-group" color={color} size={size} />
              )}
              label="Network"
              onPress={() => {
                props.navigation.navigate(routes.NETWORK)
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="note" color={color} size={size} />
              )}
              label="Pages"
              onPress={() => {
                props.navigation.navigate(routes.PAGE)
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple>
              <View style={styles.preference}>
                <View>
                  <Toggle checked onChange={() => {}}>
                    Dark Mode
                  </Toggle>
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {/* <DrawerItem
          onPress={() => {
            console.log('Support')
          }}
          icon={({ color, size }) => (
            <Icon name="phone" color={color} size={size} />
          )}
          label="Support"
        /> */}
        <DrawerItem
          onPress={() => {
            signOutUser()
          }}
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
        />
      </Drawer.Section>
    </>
  )
}

export default DrawerContent
