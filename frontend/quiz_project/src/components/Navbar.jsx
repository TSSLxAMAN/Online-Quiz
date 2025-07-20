import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import logo from '../assets/icons/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-green-700 p-4 flex justify-between items-center shadow-lg relative">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8">
          <img src={logo} alt="" />
        </div>
        <h1 className="text-2xl font-bold tracking-wide text-white">Online Quiz</h1>
      </div>

      <div className="hidden md:flex gap-6 ml-auto pe-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white cursor-pointer'
            }`
          }
        >
          Home
        </NavLink>

        {!isAuthenticated && (<>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-5 py-3 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white cursor-pointer'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </NavLink>

        </>)}

        {isAuthenticated ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-5 py-2 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white cursor-pointer'
                }`
              }
            >
              Dashboard
            </NavLink>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded text-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-5 py-2 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white cursor-pointer'
              }`
            }
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="flex items-center md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu items */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full flex flex-col gap-4 p-4 z-10 bg-green-700 shadow-md md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-5 py-3 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white cursor-pointer'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-5 py-3 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white cursor-pointer'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-5 py-2 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white cursor-pointer'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded text-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-5 py-3 rounded text-lg transition-all font-semibold ${isActive ? 'bg-green-900 text-white' : 'bg-green-800 hover:bg-green-900 text-white cursor-pointer'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
