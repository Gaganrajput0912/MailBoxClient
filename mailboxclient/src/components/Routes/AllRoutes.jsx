import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Auth/Signup';
import HomePage from '../Pages/HomePage'
import SentMail from '../Pages/SentMail';
import Mail from '../Pages/Mail';
import { useSelector } from 'react-redux';
import Login from '../Auth/Login';
import SendMail from '../Pages/SendMail';
import Inbox from '../Pages/Inbox';
const AllRoutes = () => {
    const {isLogin,isLoginPage} = useSelector(state => state.auth)
 console.log(isLoginPage)
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/sent" element={<SentMail/>} />
      <Route path="/inbox/:id" element={<Mail />} />
      <Route path="/sendmail" element={<SendMail />} />
      <Route path="/auth" element={!isLoginPage ? <Signup /> : <Login />} />
    </Routes>
  );
}

export default AllRoutes