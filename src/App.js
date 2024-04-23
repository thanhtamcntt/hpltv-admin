import './App.css';
import LayoutAdmin from './layout';
import { Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Router from './routes/index';
import { useContext } from 'react';
import LoadingPage from './page/LoadingPage';
import { RoleContext } from './contexts/RoleUserContext';

function App() {


  const { userInfo,isLogin } = useContext(RoleContext);


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
