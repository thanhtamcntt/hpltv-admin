import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import ChildrenContext from '../contexts/ChildrenContext';
import HomePage from '../page/HomePage';
import AssetsPage from '../page/AssetsPage';
import ManageUserPage from '../page/ManageUserPage';

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
          element={
            <AssetsPage
              title={select === 'category' ? 'Name category' : 'Name film'}
              key={select === 'category' ? 'name' : 'title'}
              dataIndex={select === 'category' ? 'name' : 'title'}
              type={select}
            />
          }
        />
      )}
      {(select === 'user' || select === 'subscriber') && (
        <Route
          path={'/' + select}
          element={
            <ManageUserPage
              title={select === 'user' ? 'Name user' : 'Name subscriber'}
              type={select}
            />
          }
        />
      )}
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default Router;
