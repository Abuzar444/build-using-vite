import React from 'react'
import Wrapper from "../assets/wrappers/LandingPage"
import mainImg from "../assets/images/main.svg"
import { Navigate,Link } from "react-router-dom";
import {Logo} from '../components';
import { useGlobalContext } from '../context/AppContext';

const Landing = () => {
  const { user } = useGlobalContext();

  return (
    <>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <section className="page container">
          <article className="info">
            <h1>
              Job
              <span>
                Tracking
              </span>
              App
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto deleniti earum repudiandae! Nihil cupiditate modi cum ut cumque, nesciunt, fuga ducimus dolore nulla debitis ab quae non quos perferendis vero!
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </article>
          <img src={mainImg} alt="main img" className="main-img" />
        </section>
      </Wrapper>
    </>
  );
};

export default Landing
