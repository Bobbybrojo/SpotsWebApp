import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as client from "./client";
import { useSelector } from "react-redux";

export default function PostForm(props: any) {
  const [post, setPost] = useState<any>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const createPost = () => {
    const newPost = { ...post, creator: currentUser._id, likes: 0 };
    client.createPost(currentUser, newPost);
    exitPost();
    console.log("exiting creat post");
    window.location.reload();
  };

  const exitPost = () => {
    props.onHide();
    setPost({});
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          defaultValue={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="form-control mb-2"
          placeholder="Post Title"
          id="wd-title"
        />
        <input
          defaultValue={post.address}
          onChange={(e) => setPost({ ...post, address: e.target.value })}
          className="form-control mb-2"
          placeholder="Address"
          id="wd-address"
        />
        <textarea
          className="form-control mb-2"
          id="wd-description"
          rows={3}
          placeholder="Your description, experience of, or thoughts on the location"
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={exitPost}>
          Cancel
        </Button>
        <Button onClick={createPost}>Post</Button>
      </Modal.Footer>
    </Modal>
  );
}
