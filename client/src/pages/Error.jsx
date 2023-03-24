import React from 'react'
import Wrapper from "../assets/wrappers/ErrorPage"
import logo from "../assets/images/not-found.svg"
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper className="full-page container">
      <article>
    <img src={logo} alt="not found" />
      <h1>Ohh! Page Not Found</h1>
      <p>We seem not to find page you're looking for </p>
      <Link to="/" >
        Back home
      </Link>
      </article>
    </Wrapper>
  );
}

export default Error
