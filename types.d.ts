import routes from "./src/navigation/routes";

type Id = string | number;
interface ListItem {
  label: string;
  value: string;
}

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface PostProps {
  postText: string;
  medias: Medias[];
  createdAt: string;
  likes: number;
  comments: number;
  likers: User[];
  user: User;
  id: number;
}

interface CommentInterface extends Omit<PostProps, "media"> {
  postId: Pick<PostProps, "id">;
}
export type FeedStackParams = {
  Timeline: undefined;
  Gallery: undefined;
  Comment: PostProps;
};
export type BlogStackParams = {
  [route.BLOG_LIST]: undefined;
  [route.BLOG_DETAILS]: undefined;
};

export type ProfileStackParams = {
  [routes.PROFILE]: { profileId: string } | undefined;
};

export type BottomTabParms = {
  [routes.TIMELINE]: undefined;
  [routes.ACCOUNT]: undefined | { profileId: string };
  [routes.INBOX]: undefined;
  [routes.COMMUNITY]: undefined;
  [routes.BLOGS]: undefined;
};

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  user: User;
}

export interface Conversation {
  id: number;
  users: User[] | User;
  messages: Message[];
  lastMessage: Message;
  amountOfUnreadMessages: number;
}

interface Interest {
  id: number;
  name: string;
}
export interface CommunityInterface {
  id: number;
  name: string;
  createdAt: string;
  backgroundImage: string;
  interests: Interest[];
  size?: "small" | "medium" | "large";
  style: Object;
  members: User[];
}

interface BlogsInterface {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  updatedAt: string;
  creator: User;
  backgroundImage: string;
  interests: Interest[];
}
