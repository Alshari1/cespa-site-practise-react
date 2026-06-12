import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import './Nav.css'
import userAvatar from '../../../assets/user-avatar.png'
import noUserAvatar from '../../../assets/user-avatar (1).png'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Advisors', to: '/advisors' },
  { label: 'Committee', to: '/committees' },
  { label: 'Alumni', to: '/alumni' },
  { label: 'Signup', to: '/signup' },
]

export default function Nav() {
  const { isAdmin, user } = useAuth()

  const links = (
    <>
      {navItems.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
      {isAdmin && (
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  )

  return (
    <nav className="w-full shadow-lg font-inter bg-darkgreen1 border-b border-b-[#A87040]">
      <div className="px-5">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {links}
              </ul>
            </div>
            <p className="font-light text-cream1" style={{ fontFamily: 'Preospe' }}>
              CESPA
            </p>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2 uppercase text-[14px] text-cream1">
              <li>
                <a href="#" className="nav-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Department
                </a>
              </li>
              <li>
                <a href="./alumni.html" className="nav-link">
                  Alumni
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Contact
                </a>
              </li>
              <li>
                <a href="./signup.html" className="nav-link">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-end flex gap-4">
            <span id="user" className="bg-white rounded-full p-1">
              {
                user ? (
                  <img className="w-8 h-8 object-cover" src={userAvatar} alt="User Avatar" />
                ) : (
                  <img className="w-8 h-8 object-cover" src={noUserAvatar} alt="No User Avatar" />
                )
              }
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}


