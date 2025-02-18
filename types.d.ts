import routes from './src/navigation/routes'

type Id = string | number
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
interface User {
  firstName: string
  lastName: string
  createdAt: Date
  profilePicture: string
  amountOfFollower: number
  amountOfFollowing: number
  nextCompletionStep: NextCompletionStep
}

interface Profile extends User {
  dob?: string
}
type Notice = 'public' | 'private' | 'network'

export interface PostProps {
  postText?: string
  Media?: Medias[]
  createdAt?: string
  amountOfKorems?: number
  amountOfComments?: number
  likers?: User[]
  User?: User
  reactors: User[]
  id: number | string
  canDelete?: Boolean
  isReactor?: Boolean
  createdAt: Date
  privacyType: Notice
  UserId: number | string
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
export type FeedStackParams = {
  Timeline: undefined
  Gallery: undefined
  Comment: PostProps
}

export type ProfileStackParams = {
  [routes.PROFILE]: { profileId: string } | undefined
}

export type BottomTabParms = {
  [routes.TIMELINE]: undefined
  [routes.ACCOUNT]: undefined | { profileId: string }
  [routes.INBOX]: undefined
  [routes.COMMUNITY]: undefined
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
