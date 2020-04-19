export interface Post {
  id: string;
  content: string;
  imagePath: string;
  postTime: Date;
  likedBy: any;
  comments: [];
  creator: any;
}
