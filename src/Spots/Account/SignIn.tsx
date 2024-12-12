import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as client from "./client";

export default function SignIn(props: any) {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    props.onHide();
    navigate(`/profile/${user._id}`);
  };

  const { showSignUp, ...rest } = props;

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="form-control mb-2"
          placeholder="username"
          id="wd-username"
        />
        <input
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="form-control mb-2"
          placeholder="password"
          type="password"
          id="wd-password"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" className="btn btn-success" onClick={showSignUp}>
          Sign Up
        </Button>
        <Button className="btn btn-secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={signin}>Log In</Button>
      </Modal.Footer>
    </Modal>
  );
}
