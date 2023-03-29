import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Auth/Signup';
import HomePage from '../Pages/HomePage'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Signup/>} />
    </Routes>
  );
}

export default AllRoutes