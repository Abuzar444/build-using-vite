import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useGlobalContext } from '../context/AppContext';

const BigSidebar = () => {
  const { showSidebar } = useGlobalContext();

  return (
    <Wrapper>
      <article className={
        showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
      }>
        <div className="content">
          <header>
            <Logo/>
          </header>
          <div className="nav-links">
            <NavLinks/>
          </div>
        </div>
      </article>
    </Wrapper>
  )
}

export default BigSidebar
