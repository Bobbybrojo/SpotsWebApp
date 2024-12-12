import { useEffect, useState } from "react";
import * as postClient from "./client";
import * as userClient from "../Account/client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

export default function Posts({ showSignIn }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [creators, setCreators] = useState<{ [key: string]: string }>({});
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const posts = await postClient.getPosts();
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCreator = async (id: any) => {
    const user = await userClient.getUser(id);
    setCreators((prevCreators) => ({
      ...prevCreators,
      [id]: user.username,
    }));
  };

  const fetchLikes = async (post: any) => {
    const liked = currentUser.likedPosts.includes(post._id);
    setLikes((prevLikes) => ({
      ...prevLikes,
      [post._id]: liked,
    }));
  };

  const likePost = async (post: any) => {
    const user = await userClient.getUser(currentUser._id);
    setLikes((prevLikes) => ({
      ...prevLikes,
      [post._id]: true,
    }));
    await userClient.updateUser({
      ...user,
      likedPosts: [...user.likedPosts, post._id],
    });
    const newLikeCount = post.likes + 1;
    const result = await postClient.updatePost({
      ...post,
      likes: newLikeCount,
    });
    console.log(result);
  };

  const unlikePost = async (post: any) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [post._id]: false,
    }));
    const newLikedPosts = currentUser.likedPosts.filter(
      (post_id: any) => post_id !== post._id
    );
    await userClient.updateUser({
      ...currentUser,
      likedPosts: newLikedPosts,
    });
    await postClient.updatePost({ ...post, likes: post.likes - 1 });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    posts.forEach((post) => {
      if (!creators[post.creator]) {
        fetchCreator(post.creator);
      }
      if (currentUser && !likes[post._id]) {
        fetchLikes(post);
      }
    });
  }, [posts, currentUser]);

  return (
    <>
      <div className="container bg-light h-75 border border-4 rounded border-light p-2">
        <h1>Your Feed</h1>
        {posts.map((post) => (
          <div className="card mb-3 p-2" key={post._id}>
            <div className="d-flex align-items-top position-absolute top-0 end-0">
              {!likes[post._id] && (
                <FcLikePlaceholder
                  onClick={() => {
                    currentUser ? likePost(post) : showSignIn();
                  }}
                  style={{ height: 30, width: 30 }}
                />
              )}
              {likes[post._id] && (
                <FcLike
                  onClick={() => unlikePost(post)}
                  style={{ height: 30, width: 30 }}
                />
              )}
            </div>
            <div className="content container text-start">
              <h2>{post.title}</h2>
              <p>
                Posted by{" "}
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    navigate(`/profile/${post.creator}`);
                  }}
                >
                  {creators[post.creator]}
                </Button>
              </p>
              <a
                href={`https://maps.google.com/?q=${post.address}`}
                target="_blank"
              >
                <h4>{`Address: ${post.address}`}</h4>
              </a>

              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
