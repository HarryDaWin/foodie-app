
import { NavLink, useLocation } from 'react-router-dom';

import '../App.css';

const Navbar = () => {
    const location = useLocation();

    const handleClick = (event, path) => {
        if (location.pathname === path) {
            event.preventDefault();
        }
    };

    return (
        <nav>
            <ul>
                <li>
                    <NavLink 
                        to="/" 
                        onClick={(e) => handleClick(e, '/')}
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Accounts
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/createAccount" 
                        onClick={(e) => handleClick(e, '/createAccount')}
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Create Account
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;