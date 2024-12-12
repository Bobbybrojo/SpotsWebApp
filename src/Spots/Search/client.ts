import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;
export const GOOGLE_API = `${REMOTE_SERVER}/api`;

export const getSearchResults = async (input: any) => {
  const input_package = { input: input };
  const response = await axiosWithCredentials.post(
    `${GOOGLE_API}/search-nearby`,
    input_package
  );
  return response.data;
};

export const getDetails = async (detailsId: any) => {
  const response = await axiosWithCredentials.get(
    `${GOOGLE_API}/findplace/${detailsId}`
  );
  return response.data;
};
