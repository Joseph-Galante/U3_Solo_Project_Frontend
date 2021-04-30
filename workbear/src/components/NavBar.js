// link
import { Link } from 'react-router-dom'
// contexts
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const NavBar = () =>
{
    // states
    const { userState } = useContext(UserContext);
    const [user, setUser] = userState;

    // functions
    const logoutUser = () =>
    {
        localStorage.removeItem('userId');
        setUser({});
    }

    return (
        <nav>
            {user.id ?
                <span>
                    <span className="navLeft">
                        <Link to="/">Home</Link>{' | '}
                        <Link to="/projects">Projects</Link>
                    </span>
                    <span className="navRight">
                        <Link to="/profile">Profile</Link>{' | '}
                        <Link to="/" onClick={logoutUser}>Logout</Link>
                    </span>
                </span>
                :
                <span>
                    <span className="navLeft">
                        <Link to="/">Home</Link>
                    </span>
                    <span className="navRight">
                        <Link to="/signup">Signup</Link>{' | '}
                        <Link to="/login">Login</Link>
                    </span>
                </span>
            }
        </nav>
    )
}

export default NavBar;