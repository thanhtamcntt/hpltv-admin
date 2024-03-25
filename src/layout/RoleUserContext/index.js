import React, { createContext, useEffect, useState } from 'react';
import LoadingPage from '../../components/page/LoadingPage';
import { useLocation } from 'react-router-dom';

export const RoleContext = createContext();

function RoleUserContext({ children }) {
  const [userInfo, setUserInfo] = useState();

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(process.env.REACT_APP_API_VERIFY_TOKEN, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setUserInfo(json.userInfo);
      }
    };
    if (localStorage.getItem('token')) {
      fetchUserInfo();
    } else {
      setUserInfo('');
    }
  }, [pathname]);

  return (
    <RoleContext.Provider value={{ userInfo }}>{children}</RoleContext.Provider>
  );
}

export default RoleUserContext;
