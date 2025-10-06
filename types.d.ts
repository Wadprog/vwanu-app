import routes from './src/navigation/routes'

// Import generated types from backend API
export * from './src/types/generatedTypes'

// Frontend-specific types and overrides
type Id = string | number

// Type aliases to resolve conflicts between frontend and backend types
// Use backend types as base and extend with frontend-specific properties
export type BackendUser = UserInterface
export type BackendPost = PostInterface
export type BackendProfile = ProfileInterface
interface ListItem {
  label: string
  value: string
}

interface Media {
  id: number
  original: string
  medium: string
  large: string
  small: string
  tiny: string
  post_id: number
  UserId: number
  height: number
}

export enum NextCompletionStep {
  START = 1,
  FIND_FRIENDS = 2,
  PROFILE_PICTURE = 3,
  PROFILE_COMPLETE = 4,
}
export interface User {
  firstName: string
  lastName: string
  createdAt: Date
  profilePicture:
    | string
    | {
        original: string
        medium: string
        small: string
        tiny: string
      }
  amountOfFollower: number
  amountOfFollowing: number
  amountOfFriends: number
  nextCompletionStep: NextCompletionStep
  id: string
  email: string
}

interface Profile extends User {
  dob?: Date
  gender?: string
  bio?: string
  location?: string
}
export type Notice = 'public' | 'private' | 'network'

// Community privacy types
export type CommunityPrivacyType = 'public' | 'private' | 'hidden'

export interface CommunityPrivacyConfig {
  type: CommunityPrivacyType
  requireApproval: boolean
  description: string
}

export interface PostProps {
  postText?: string
  media?: Media[]
  amountOfKorems: number
  amountOfComments: number
  likers?: User[]
  user?: User
  reactors: User[]
  id: number | string
  canDelete?: boolean
  isReactor?: boolean
  createdAt: Date
  privacyType: Notice
  userId: number | string
  disableNavigation?: boolean
  communityId?: string
}

export interface UpdatePost {
  id: string | number
  data: Partial<PostProps>
}

export interface PostKoremProps {
  postId: number
  User: User
  createdAt: Date
}

interface CommentInterface extends Omit<PostProps, 'media'> {
  postId: Pick<PostProps, 'id'>
}
export type FeedStackParams = Record<string, object | undefined> & {
  Feed: undefined
  Comment: PostProps
  Gallery: PostProps & { initialSlide?: number }
  SinglePost: { postId: string; isCommenting?: boolean }
}

export type ProfileStackParams = {
  [routes.PROFILE]: { profileId: string } | undefined
  SinglePost: { postId: string; isCommenting?: boolean }
  Settings: undefined
  NotificationSettings: undefined
  AccountSettings: undefined
  PrivacySettings: undefined
  AppearanceSettings: undefined
  HelpSettings: undefined
  AboutSettings: undefined
}

export type BottomTabParms = {
  [routes.TIMELINE]: undefined
  [routes.ACCOUNT]: undefined | { profileId: string }
  [routes.INBOX]: undefined
  [routes.COMMUNITY]: undefined
}

export type CommunityStackParams = {
  Communities: undefined
  CommunityDetail: { communityId: string }
  CreateCommunity: undefined
  CommunitySettings: { communityId: string }
}

export interface Message {
  id: number
  content: string
  createdAt: string
  user: User
}

export interface Conversation {
  id: number
  users: User[] | User
  messages: Message[]
  lastMessage: Message
  amountOfUnreadMessages: number
}

interface Profiles extends User {
  id: string
  bio?: string
  email: string
  gender?: string
  emailVerified: boolean
  dob?: string
  searchVector?: string | null
  online: boolean
}

export interface CommunityInterface {
  name: string
  profilePicture: string
  createdAt: string
  id: number
  interests?: Interest[]
  canInvite: string
  canPost: string
  createdAt: Date
  creatorId: string
  description: string
  id: string
  members: User[]
  numAdmins: number
  numMembers: number
  pendingInvitation: null
  privacyType: string
  profilePicture: string
  updatedAt: Date
  isCreateCard?: boolean
  isMember?: Member
}
