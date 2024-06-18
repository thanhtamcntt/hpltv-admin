import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import ChildrenContext from '../contexts/ChildrenContext';
import HomePage from '../page/HomePage';
import AssetsPage from '../page/AssetsPage';
import ManageUserPage from '../page/ManageUserPage';
import PaymentAndPackagePage from '../page/PaymentAndPackagePage';
import ProfilePage from '../page/ProfilePage';
import SettingPage from '../page/SettingPage';
import ChatPage from '../page/ChatPage';

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
        select === 'trash-movies' ||
        select === 'film-for-series' ||
        select === 'trash-film-for-series') && (
        <>
          <Route
            path={'/' + select}
            element={
              <AssetsPage
                title={
                  select === 'category'
                    ? 'Name category'
                    : select === 'film-for-series' ||
                      select === 'trash-film-for-series'
                    ? 'Episode'
                    : 'Name film'
                }
                key={
                  select === 'category'
                    ? 'name'
                    : select === 'film-for-series' ||
                      select === 'trash-film-for-series'
                    ? 'filmSerialNumber'
                    : 'title'
                }
                dataIndex={
                  select === 'category'
                    ? 'name'
                    : select === 'film-for-series' ||
                      select === 'trash-film-for-series'
                    ? 'filmSerialNumber'
                    : 'title'
                }
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

      {(select === 'payment' || select === 'subscription-price') && (
        <>
          <Route
            path={'/' + select}
            element={<PaymentAndPackagePage type={select} />}
          />
          <Route
            path={'/' + select + '?page=:pageNum'}
            element={<PaymentAndPackagePage type={select} />}
          />
        </>
      )}

      {(select === 'common-questions' || select === 'customer-questions') && (
        <>
          <Route path={'/' + select} element={<SettingPage type={select} />} />
          {/* <Route
            path={'/' + select + '?page=:pageNum'}
            element={<PaymentAndPackagePage type={select} />}
          /> */}
        </>
      )}

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
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/support-customer" element={<ChatPage />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default Router;
