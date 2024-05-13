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
      {select === 'statistics' && (
        <Route path="/" element={<HomePage type={select} />} />
      )}
      {(select === 'series' ||
        select === 'movies' ||
        select === 'category' ||
        select === 'trash-series' ||
        select === 'trash-movies') && (
        <>
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

          <Route
            path={'/' + select + '?page=:pageNum'}
            element={
              <AssetsPage
                title={select === 'category' ? 'Name category' : 'Name film'}
                key={select === 'category' ? 'name' : 'title'}
                dataIndex={select === 'category' ? 'name' : 'title'}
                type={select}
              />
            }
          />
        </>
      )}
      {
        <>
          <Route
            path={'/series/:seriesId'}
            element={
              <AssetsPage
                title={'Name film'}
                key={'title'}
                dataIndex={'title'}
                type={'series'}
              />
            }
          />

          <Route
            path={'/series/:seriesId?page=:pageNum'}
            element={
              <AssetsPage
                title={select === 'category' ? 'Name category' : 'Name film'}
                key={select === 'category' ? 'name' : 'title'}
                dataIndex={select === 'category' ? 'name' : 'title'}
                type={'series'}
              />
            }
          />
        </>
      }
      {(select === 'user' ||
        select === 'subscriber' ||
        select === 'banned-subscriber') && (
        <Route
          path={'/' + select}
          element={
            <ManageUserPage
              title={
                select === 'user'
                  ? 'Name user'
                  : 'subscriber'
                  ? 'Name subscriber'
                  : 'Banned subscriber'
              }
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
