import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Auth/Signup';
import HomePage from '../Pages/HomePage'
import { useSelector } from 'react-redux';
import Login from '../Auth/Login';

const AllRoutes = () => {
    const {isLogin,isLoginPage} = useSelector(state => state.auth)
 console.log(isLoginPage)
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route path="/auth" element={!isLoginPage ? <Signup /> : <Login />} />
    </Routes>
  );
}

export default AllRoutes