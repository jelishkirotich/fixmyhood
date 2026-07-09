import { NavLink } from 'react-router-dom'

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        🏠<span>Home</span>
      </NavLink>
      <NavLink to="/map" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        🗺️<span>Map</span>
      </NavLink>
      <NavLink to="/report" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        ➕<span>Report</span>
      </NavLink>
      <NavLink to="/my-reports" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        📋<span>My Reports</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        👤<span>Profile</span>
      </NavLink>
    </nav>
  )
}

export default BottomNav