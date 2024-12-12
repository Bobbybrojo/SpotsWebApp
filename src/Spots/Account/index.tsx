import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import UserPosts from "../Posts/UserPosts";
import { Button } from "react-bootstrap";

export default function Profile({ navbarDimensions }: any) {
  const [profile, setProfile] = useState<any>({});
  const [following, setFollowing] = useState<{ [key: string]: string }>({});
  const [followers, setFollowers] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [profileUser, setProfileUser] = useState<any>({
    following: [],
    followers: [],
  });

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = async () => {
    if (!currentUser) return navigate("/");
    const user = await client.getUser(uid);
    setProfile(user);
  };

  const fetchProfileUser = async () => {
    const user = await client.getUser(uid);
    setProfileUser(user);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/");
  };

  const deleteProfile = async () => {
    await client.deleteUser(currentUser._id);
    dispatch(setCurrentUser(null));
    navigate("/");
  };

  const follow = async () => {
    const newUser = {
      ...currentUser,
      following: [...currentUser.following, uid],
    };
    await client.updateUser(newUser);
    const newProfileUser = {
      ...profileUser,
      followers: [...profileUser.followers, currentUser._id],
    };
    await client.updateUser(newProfileUser);
    setProfileUser(newProfileUser);
  };

  const fetchFollowing = async (id: any) => {
    const user = await client.getUser(id);
    setFollowing((prevFollowing) => ({
      ...prevFollowing,
      [id]: user.username,
    }));
    console.log(`ProfileFollowing${profileUser.following}`);
    console.log(`Following${following}`);
  };

  const fetchFollower = async (id: any) => {
    const user = await client.getUser(id);
    setFollowers((prevFollowers) => ({
      ...prevFollowers,
      [id]: user.username,
    }));
    console.log(`ProfileFollowers${profileUser.followers}`);
    console.log(`Followers${followers}`);
  };

  useEffect(() => {
    fetchProfileUser();
  }, [uid]);

  useEffect(() => {
    for (const follow of profileUser.following) {
      fetchFollowing(follow);
    }
    for (const follower of profileUser.followers) {
      fetchFollower(follower);
    }
  }, [profileUser]);

  useEffect(() => {
    fetchProfile();
  }, [uid]);

  return (
    <>
      <div
        className="content-spacer"
        style={{ paddingBottom: navbarDimensions.clientHeight }}
      ></div>
      <div className="wd-profile-screen">
        <div className="d-flex flex-wrap">
          <div className="card p-3 mx-auto">
            <div className="d-flex justify-content-center mb-3">
              <h2>Profile</h2>
              {currentUser._id !== uid && (
                <Button
                  className="p-2 m-1 ms-3"
                  variant="success"
                  onClick={follow}
                >
                  Follow
                </Button>
              )}
            </div>
            {profile && (
              <div>
                <div className="d-flex flex-row align-items-center">
                  <label className="mx-4" htmlFor="wd-username">
                    Username:
                  </label>
                  <input
                    defaultValue={profile.username}
                    id="wd-username"
                    className="form-control mb-2"
                    disabled={currentUser._id !== uid ? true : false}
                    onChange={(e) =>
                      setProfile({ ...profile, username: e.target.value })
                    }
                  />
                </div>
                {currentUser._id === uid && (
                  <div className="d-flex flex-row align-items-center">
                    <label className="mx-4" htmlFor="wd-password">
                      Password:
                    </label>
                    <input
                      defaultValue={profile.password}
                      id="wd-password"
                      className="form-control mb-2"
                      onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })
                      }
                    />
                  </div>
                )}
                <div className="d-flex flex-row align-items-center">
                  <label className="mx-4" htmlFor="wd-firstname">
                    First Name:
                  </label>
                  <input
                    defaultValue={profile.firstName}
                    id="wd-firstname"
                    className="form-control mb-2"
                    disabled={currentUser._id !== uid ? true : false}
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="d-flex flex-row align-items-center">
                  <label className="mx-4" htmlFor="wd-lastname">
                    Last Name:
                  </label>
                  <input
                    defaultValue={profile.lastName}
                    id="wd-lastname"
                    className="form-control mb-2"
                    disabled={currentUser._id !== uid ? true : false}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="d-flex flex-row align-items-center">
                  <label className="mx-4" htmlFor="wd-dob">
                    Date of Birth:
                  </label>
                  <input
                    defaultValue={profile.dob}
                    id="wd-dob"
                    className="form-control mb-2"
                    disabled={currentUser._id !== uid ? true : false}
                    onChange={(e) =>
                      setProfile({ ...profile, dob: e.target.value })
                    }
                    type="date"
                  />
                </div>
                <div className="d-flex flex-row align-items-center">
                  <label className="mx-4" htmlFor="wd-email">
                    Email:
                  </label>
                  <input
                    defaultValue={profile.email}
                    id="wd-email"
                    className="form-control mb-2"
                    disabled={currentUser._id !== uid ? true : false}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
                <div className="d-flex flex-row align-items-center">
                  <label className="mx-4" htmlFor="wd-role">
                    User Type:
                  </label>
                  <select
                    disabled={currentUser._id !== uid ? true : false}
                    onChange={(e) =>
                      setProfile({ ...profile, role: e.target.value })
                    }
                    className="form-control mb-2"
                    id="wd-role"
                    value={profile.role}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                {currentUser._id === uid && (
                  <div className="d-flex flex-row mt-2">
                    <button
                      onClick={updateProfile}
                      className="btn btn-primary w-100 mb-2"
                    >
                      Update
                    </button>

                    <button
                      onClick={signout}
                      className="btn btn-danger w-100 mb-2"
                      id="wd-signout-btn"
                    >
                      Sign out
                    </button>
                    <button
                      onClick={deleteProfile}
                      className="btn btn-danger w-100 mb-2"
                    >
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="card mx-auto p-3">
            <h2 className="mb-3">Following</h2>
            {Object.entries(following).map(([key, value]): any => (
              <div className="card" key={key}>
                <Link
                  to={`/profile/${key}`}
                  onClick={() => {
                    console.log("Profile clicked");
                  }}
                >
                  {value}
                </Link>
              </div>
            ))}
          </div>
          <div className="card mx-auto p-3">
            <h2 className="mb-3">Followers</h2>
            {Object.entries(followers).map(([key, value]): any => (
              <div className="card" key={key}>
                <Link to={`/profile/${key}`} onClick={() => {}}>
                  {value}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <br />
        <h3>Posts</h3>
        <UserPosts />
      </div>
    </>
  );
}
