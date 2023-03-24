import { useState } from 'react';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';
import {useGlobalContext} from "../context/AppContext" 
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

const Navbar = () => {
  const { user,toggleSidebar,logoutUser } = useGlobalContext();
  const [showLogOut, setShowLogOut] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          onClick={toggleSidebar}
          className="toggle-btn">
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>
            dashboard
          </h3>
        </div>

        <div className="btn-container">
          <button className="btn" onClick={() => setShowLogOut(!showLogOut)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>

          <div className={showLogOut ? "dropdown show-dropdown": "dropdown"}>
            <button
              onClick={() => logoutUser()}
              className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar
