import Header from './custom/Header'
import Footer from './custom/Footer'
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { LogInContext } from '@/Context/LogInContext/Login';
// import { isFileLoadingAllowed } from 'vite';

const AuthLayout = ({children}) => {
    const { user, isAuthenticated, isLoading } = useContext(LogInContext); // or useAuth0() directly
    
    const location = useLocation();
  console.log('location in auth', location, isAuthenticated)
    // if (!isAuthenticated) {
    //   return <Navigate to="/login" state={{ from: location }} replace />;
    // }
  
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default AuthLayout