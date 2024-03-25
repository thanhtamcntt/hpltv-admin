import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import ChildrenContext from '../layout/ChildrenContext';
import HomePage from '../components/Home';
import AssetsPage from '../components/page/AssetsPage';
import ManageUserPage from '../components/page/ManageUserPage';

function Router() {
  const { select } = React.useContext(ChildrenContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {(select === 'series' ||
        select === 'movies' ||
        select === 'category') && (
        <Route
          path={'/' + select}
          element={<AssetsPage title={select} type={select} />}
        />
      )}
      {(select === 'user' || select === 'subscriber') && (
        <Route
          path={'/' + select}
          element={<ManageUserPage title={select} type={select} />}
        />
      )}
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default Router;
