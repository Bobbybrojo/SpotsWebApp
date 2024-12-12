import { useState } from "react";
import Session from "./Account/Session";
import Navigation from "./Home/Navigation";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./Home";
import Profile from "./Account";
import { useResizeObserver } from "./Home/ResizeObserver";
import Details from "./Search/Details";

export default function Spots() {
  const [signinShow, setSignInShow] = useState(false);
  const [signupShow, setSignUpShow] = useState(false);
  const [newPostShow, setNewPostShow] = useState(false);
  const [searchResults, setSearchResults] = useState<any>([]);
  const { observeRef, dimensions } = useResizeObserver();
  const navigate = useNavigate();

  const showNewPost = () => {
    navigate("/");
    setNewPostShow(true);
  };

  return (
    <Session>
      <Navigation
        showSignIn={() => setSignInShow(true)}
        showNewPost={showNewPost}
        navbarRef={observeRef}
        setSearchResults={setSearchResults}
      />
      <Routes>
        <Route>
          <Route
            path="/"
            element={
              <Home
                signinShow={signinShow}
                setSignInShow={setSignInShow}
                signupShow={signupShow}
                setSignUpShow={setSignUpShow}
                newPostShow={newPostShow}
                setNewPostShow={setNewPostShow}
                navbarDimensions={dimensions}
                searchResults={searchResults}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                signinShow={signinShow}
                setSignInShow={setSignInShow}
                signupShow={signupShow}
                setSignUpShow={setSignUpShow}
                newPostShow={newPostShow}
                setNewPostShow={setNewPostShow}
                navbarDimensions={dimensions}
                setSearchResults={setSearchResults}
              />
            }
          />
          <Route
            path="/profile/:uid"
            element={<Profile navbarDimensions={dimensions} />}
          />
          <Route
            path="/details/:did"
            element={<Details navbarDimensions={dimensions} />}
          />
        </Route>
      </Routes>
    </Session>
  );
}
