import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className=" d-flex justify-content-around p-3 bg-secondary">
      <Link className="text-white" to="/">
        HOME
      </Link>
      <Link className="text-white" to="/auth">
        SIGNUP
      </Link>
    </div>
  );
}

export default Header