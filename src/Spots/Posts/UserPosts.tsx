import { useEffect, useState } from "react";
import * as postClient from "./client";
import * as userClient from "../Account/client";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Button } from "react-bootstrap";

export default function UserPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [creators, setCreators] = useState<{ [key: string]: string }>({});
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { uid } = useParams();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const posts = await postClient.getPostsForUser(uid);
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

  const updatePost = async (post: any) => {
    await postClient.updatePost(post);
  };

  const deletePost = async (post: any) => {
    await postClient.deletePost(post);
    console.log("Deleted post");
    window.location.reload();
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
        {posts.length != 0 ? (
          posts.map((post) => (
            <div className="card mb-3 p-2" key={post._id}>
              <div className="d-flex align-items-top position-absolute top-0 end-0">
                {!likes[post._id] && (
                  <FcLikePlaceholder
                    onClick={() => {
                      likePost(post);
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
                {currentUser._id === uid || currentUser.role === "ADMIN" ? (
                  <input
                    className="form-control"
                    value={post.title}
                    onChange={(e) => {
                      setPosts(
                        posts.map((p) => {
                          if (p._id === post._id) {
                            return { ...p, title: e.target.value };
                          } else {
                            return p;
                          }
                        })
                      );
                    }}
                  ></input>
                ) : (
                  <h2>{post.title}</h2>
                )}
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
                {currentUser._id === uid || currentUser.role === "ADMIN" ? (
                  <input
                    className="form-control"
                    value={post.address}
                    onChange={(e) => {
                      setPosts(
                        posts.map((p) => {
                          if (p._id === post._id) {
                            return { ...p, address: e.target.value };
                          } else {
                            return p;
                          }
                        })
                      );
                    }}
                  ></input>
                ) : (
                  <a
                    href={`https://maps.google.com/?q=${post.address}`}
                    target="_blank"
                  >
                    <h4>{`Address: ${post.address}`}</h4>
                  </a>
                )}

                {currentUser._id === uid || currentUser.role === "ADMIN" ? (
                  <textarea
                    className="form-control"
                    value={post.description}
                    onChange={(e) => {
                      setPosts(
                        posts.map((p) => {
                          if (p._id === post._id) {
                            return { ...p, description: e.target.value };
                          } else {
                            return p;
                          }
                        })
                      );
                    }}
                  ></textarea>
                ) : (
                  <p>{post.description}</p>
                )}
              </div>
              {(currentUser._id === uid || currentUser.role === "ADMIN") && (
                <div className="d-flex mt-2 ms-3">
                  <Button
                    className="me-3"
                    variant="success"
                    onClick={() => updatePost(post)}
                  >
                    Update Post
                  </Button>
                  <Button variant="danger" onClick={() => deletePost(post)}>
                    Delete Post
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No Posts</div>
        )}
      </div>
    </>
  );
}
