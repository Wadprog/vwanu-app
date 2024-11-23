import routes from "./src/navigation/routes";
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

export type ProfileStackParams = {
  [routes.PROFILE]: { profileId: string } | undefined;
};

export type BottomTabParms = {
  [routes.TIMELINE]: undefined;
  [routes.ACCOUNT]: undefined | { profileId: string };
  [routes.INBOX]: undefined;
  [routes.COMMUNITY]: undefined;
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
