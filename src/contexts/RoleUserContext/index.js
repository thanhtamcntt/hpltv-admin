import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const RoleContext = createContext();

function RoleUserContext({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [isLogin, setIsLogin] = useState();

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLogin(undefined)
      const response = await fetch(process.env.REACT_APP_API_VERIFY_TOKEN, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setUserInfo(json.userInfo);
        setIsLogin(true)
      }
      else {
        setUserInfo('');
        setIsLogin(false)
      }
    };
    if (localStorage.getItem('tokenManager')) {
      fetchUserInfo();
    } else {
      setUserInfo('');
      setIsLogin(false)
    }
  }, [pathname]);

  
  useEffect(() => {
    setIsLogin(undefined);
    if (localStorage.getItem('tokenManager') && userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [pathname]);

  return (
    <RoleContext.Provider value={{ userInfo,isLogin }}>{children}</RoleContext.Provider>
  );
}

export default RoleUserContext;
