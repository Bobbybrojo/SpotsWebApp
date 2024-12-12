import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function SignUp(props: any) {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    await client.signup(user);
    signin();
  };

  const signin = async () => {
    const currentUser = await client.signin(user);
    if (!currentUser) return;
    dispatch(setCurrentUser(currentUser));
    props.onHide();
    navigate(`/profile/${currentUser._id}`);
  };

  const { showSignIn, ...rest } = props;

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Crete a new username and password.</h4>
        <input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="wd-username form-control mb-2"
          placeholder="username"
        />
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          className="wd-password form-control mb-2"
          placeholder="password"
        />
        <select
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          className="form-control mb-2"
          id="wd-role"
          value={user.role}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-success" onClick={showSignIn}>
          Log In
        </Button>
        <Button className="btn btn-secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={signup}>Sign Up</Button>
      </Modal.Footer>
    </Modal>
  );
}
