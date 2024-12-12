import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;

export const createPost = async (user: any, post: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${user._id}/posts`,
    post
  );
  return response.data;
};

export const getPosts = async () => {
  const response = await axiosWithCredentials.get(`${POSTS_API}`);
  return response.data;
};

export const getPostsForUser = async (user_id: any) => {
  const response = await axiosWithCredentials.get(`${POSTS_API}/${user_id}`);
  return response.data;
};

export const updatePost = async (post: any) => {
  const response = await axiosWithCredentials.put(
    `${POSTS_API}/${post._id}`,
    post
  );
  return response.data;
};

export const deletePost = async (post: any) => {
  const response = await axiosWithCredentials.delete(
    `${POSTS_API}/${post._id}`
  );
  return response.data;
};
