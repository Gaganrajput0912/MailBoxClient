import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlicer";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleSendMail = () => {
    if (!isLogin) {
      alert("Please log in to send mail.");
      navigate("/auth");
    } else {
      navigate("/inbox");
    }
  };

  // const shouldShowSendMailButton = location.pathname !== "/sendmail" && isLogin;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mail Box Client
        </Link>
        {(
          <button className="btn btn-link" onClick={handleSendMail}>
            OPEN MAIL
          </button>
        )}
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!isLogin && (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  Sign Up / Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        {isLogin && (
          <div>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
