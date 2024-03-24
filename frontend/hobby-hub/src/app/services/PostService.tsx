import { Post } from "../Models/post";

const posts: Post[] = [
  {
    id: 1,
    Description: "Card 1",
    Image: "",
    CommunityId: 1,
    userId: 1,
  },
  {
    id: 2,
    Description: "Card 2",
    Image: "",
    CommunityId: 2,
    userId: 2,
  },
  {
    id: 3,
    Description: "Card 3",
    Image: "",
    CommunityId: 3,
    userId: 3,
  },
  {
    id: 4,
    Description: "Card 4",
    Image: "",
    CommunityId: 3,
    userId: 4,
  },
];

export async function GetAllPosts(): Promise<Post[]> {
  return posts;
}

export async function GetPostById(id: number): Promise<Post> {
  // console.log(typeof(id));
  // console.log(typeof(competitions[0].id));
  const post = await posts.find((pst) => pst.id == id);
  if (post) {
    return post;
  }
  throw new Error(`Competition with id ${id} not found`);
}

export async function GetPostByUserId(communityId: number): Promise<Post[]> {
  const post = await posts.filter((pst) => pst.CommunityId == communityId);
  if (post) {
    return post;
  }
  throw new Error(`Competition with id ${communityId} not found`);
}

export async function GetPostByDescription(description: string): Promise<Post> {
  const post = await posts.find((pst) => pst.Description == description);
  if (post) {
    return post;
  }
  throw new Error(`Competition with id ${description} not found`);
}

export async function GetPostByCommunityId(
  communityId: number
): Promise<Post[]> {
  const post = await posts.filter((pst) => pst.CommunityId == communityId);

  if (post) {
    return post;
  }
  throw new Error(`Competition with id ${communityId} not found`);
}

export async function AddPost(post: Post): Promise<Post> {
  posts.push(post);
  return post;
}

export async function DeletePost(id: number): Promise<Post[]> {
  const post = await posts.filter((pst) => pst.id != id);
  if (post) {
    return post;
  }
  throw new Error(`Competition with id ${id} not found`);
}

export async function UpdatePost(post: Post): Promise<Post> {
  const postIndex = posts.findIndex((pst) => pst.id == post.id);
  if (postIndex !== -1) {
    posts[postIndex] = post;
    return post;
  }
  throw new Error(`Competition with id ${post.id} not found`);
}
