import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { useSelector } from "react-redux";
import * as searchClient from "../Search/client";
import { useState } from "react";

export default function Navigation({
  showSignIn,
  showNewPost,
  navbarRef,
  setSearchResults,
}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  const fetchResults = async (input: any) => {
    const new_results = await searchClient.getSearchResults(input);
    setSearchResults(new_results.results);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-md fixed-top bg-body-tertiary"
        ref={navbarRef}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <img
              src="./spots-logo.png"
              className=""
              style={{ width: "10rem", height: "100%" }}
              alt="Spots Logo"
            />
          </Link>
          <div className=" navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href="">
                  <IoIosHome />
                  Home
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center"
                  onClick={() => {
                    currentUser
                      ? navigate(`/profile/${currentUser._id}`)
                      : showSignIn();
                  }}
                >
                  <FaUser />
                  {!currentUser ? "Profile" : `${currentUser.username}`}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center"
                  onClick={() => {
                    currentUser ? showNewPost() : showSignIn();
                  }}
                >
                  <IoCreateOutline />
                  New Post
                </button>
              </li>
            </ul>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                onClick={() => fetchResults(searchTerm)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
