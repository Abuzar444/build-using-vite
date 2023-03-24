import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/AppContext';
import Loading from '../components/Loading';

const ProtectedRoute = ({children}) => {
  const { user,userLoading } = useGlobalContext();

  if (userLoading) return <Loading />;

  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
}

export default ProtectedRoute
