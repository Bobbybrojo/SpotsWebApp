import SignIn from "../Account/SignIn";
import SignUp from "../Account/SignUp";
import PostForm from "../Posts/PostForm";
import Posts from "../Posts";
import SearchResults from "../Search";

export default function Home({
  signinShow,
  setSignInShow,
  signupShow,
  setSignUpShow,
  newPostShow,
  setNewPostShow,
  navbarDimensions,
  searchResults,
}: any) {
  return (
    <>
      <PostForm show={newPostShow} onHide={() => setNewPostShow(false)} />
      <SignIn
        show={signinShow}
        onHide={() => setSignInShow(false)}
        showSignUp={() => {
          setSignUpShow(true);
          setSignInShow(false);
          setNewPostShow(false);
        }}
      />
      <SignUp
        show={signupShow}
        onHide={() => setSignUpShow(false)}
        showSignIn={() => {
          setSignInShow(true);
          setSignUpShow(false);
          setNewPostShow(false);
        }}
      />
      <div
        className="content-spacer"
        style={{ paddingBottom: navbarDimensions.clientHeight }}
      ></div>
      <SearchResults searchResults={searchResults} />
      <Posts showSignIn={() => setSignInShow(true)} />
    </>
  );
}
