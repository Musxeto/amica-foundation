import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const {user, logout} = useAuth();
    

    const handleLogout = async () => {
        try {
          await signOut(auth);
          toast.success('Logged out successfully');
        } catch (error) {
          toast.error('Error logging out: ' + error.message);
          console.error('Error logging out: ' + error.message);
        }
      };
  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-raisin-black shadow-light-red-500 shadow-lg text-white px-4 py-3 md:flex md:items-center md:justify-between flicker-shadow">
    <div className="flex items-center justify-between">
      <Link to="/">
        <img src={"/logo.png"} alt="Logo" className="h-10" />
      </Link>
      <button
        onClick={toggleMenu}
        className="text-white md:hidden focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>
    </div>

    {/* Sidebar Menu for Small Screens */}
    <div
      className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-raisin-black-2 shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 md:hidden`}
    >
      <button
        onClick={toggleMenu}
        className="text-white p-4 focus:outline-none absolute top-4 right-4"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex flex-col space-y-6 p-8 mt-10">
        <Link
          to="/"
          onClick={toggleMenu}
          className="text-white hover:text-buff"
        >
          Home
        </Link>
        <Link
          to="/admin/projects"
          onClick={toggleMenu}
          className="text-white hover:text-buff"
        >
         Manage Projects
        </Link>
        <Link
          to="/admin/interviews"
          onClick={toggleMenu}
          className="text-white hover:text-buff"
        >
          Manage Interviews
        </Link>
        <Link
          to="/admin/reports"
          onClick={toggleMenu}
          className="text-white hover:text-buff"
        >
          Manage Reports
        </Link>
        <button
          onClick={logout}
          className="text-white hover:text-buff"
        >
          LogOut
        </button>
      </div>
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex md:items-center space-x-6 ml-4">
      <Link to="/" className="text-white hover:text-buff">
        Home
      </Link>
      <Link to="/projects" className="text-white hover:text-buff">
        Projects
      </Link>
      <Link to="/interviews" className="text-white hover:text-buff">
        Interviews
      </Link>
      <Link
        to="/reports"
        onClick={toggleMenu}
        className="text-white hover:text-buff"
      >
        Reports
      </Link>
    </div>

    {/* LogOut Button */}
    <div className="hidden md:block ml-auto">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-light-red text-white rounded hover:bg-yellow-green transition duration-300"
      >
        LogOut
      </button>
    </div>
  </nav>
  )
}

export default AdminNavbar
