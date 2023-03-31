import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../Auth/Signup';
import HomePage from '../Pages/HomePage';
import Mail from '../Pages/Mail';
import { useSelector } from 'react-redux';
import Login from '../Auth/Login';
import SendMail from '../Pages/SendMail';
import Inbox from '../Pages/Inbox';
import SentMail from '../Pages/SentMail'; // <-- Import the new component

const AllRoutes = () => {
  const { isLogin, isLoginPage } = useSelector((state) => state.auth);
  console.log(isLoginPage);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/inbox/:id" element={<Mail />} />
      <Route path="/sendmail" element={<SendMail />} />
      <Route path="/auth" element={!isLoginPage ? <Signup /> : <Login />} />
      <Route path="/sentmail" element={<SentMail />} /> {/* <-- Add the new route */}
    </Routes>
  );
};

export default AllRoutes;
