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

interface User {
  firstName: string
  lastName: string
  profilePicture: string
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
  id: number
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
