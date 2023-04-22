import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MobileLogin from './MobileLogin';
import Profile from './Profile';
import Dashboard from './Dashboard';
import PageNotFound from './PageNotFound';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mobileLogin" element={<MobileLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>

);
