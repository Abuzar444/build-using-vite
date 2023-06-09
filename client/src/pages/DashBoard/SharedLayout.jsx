import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import {
  Navbar,
  SmallSidebar,
  BigSidebar
} from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <article>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </article>
      </main>
    </Wrapper>
  )
};

export default SharedLayout
