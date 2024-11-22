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
