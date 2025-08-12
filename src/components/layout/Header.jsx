import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import Button from "../common/Button";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-secondary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              ShakishaJob
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-tertiary hover:text-primary px-3 py-2 rounded-md text-lg font-medium"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="text-tertiary hover:text-primary px-3 py-2 rounded-md text-lg font-medium"
            >
              Jobs
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-primary">Welcome, {user?.name}</span>
                <Link
                  to="/profile"
                  className="text-tertiary hover:text-primary"
                >
                  Profile
                </Link>
                <Button onClick={handleLogout} variant="secondary" size="sm">
                  {" "}
                  Logout{" "}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    {" "}
                    Login{" "}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm"> Register </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
