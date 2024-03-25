import './App.css';
import LayoutAdmin from './layout';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/page/LoginPage';
import Router from './routes/index';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import LoadingPage from './components/page/LoadingPage';
import { RoleContext } from './layout/RoleUserContext';

function App() {
  const [isLogin, setIsLogin] = useState();
  const { pathname } = useLocation();

  const { userInfo } = useContext(RoleContext);

  useEffect(() => {
    setIsLogin(undefined);
    if (localStorage.getItem('token')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [pathname]);

  if (isLogin === undefined || userInfo === undefined) {
    return <LoadingPage />;
  }

  return (
    <div className="App">
      {isLogin ? (
        <LayoutAdmin>
          <Router />
        </LayoutAdmin>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
