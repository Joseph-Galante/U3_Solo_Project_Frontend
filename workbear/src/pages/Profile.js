import { useState, useEffect, useContext } from 'react';
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import AccountInfo from '../components/AccountInfo';
import ProjectInfo from '../components/ProjectInfo';

const Profile = () =>
{
    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [display, setDisplay] = useState('');
    
    // on component load
    useEffect(clearMessage, [display]);

    // functions

    return (
        <div className="profilePage">
            <div key="profileMenu" className="profileMenu">
                <div key="account" className="menuItem">
                    <h4 onClick={() => {setDisplay('account')}}>Account</h4>
                </div>
                <div key="projects" className="menuItem">
                    <h4 onClick={() => {setDisplay('projects')}}>Projects</h4>
                </div>
            </div>
            {display === 'account' ? <AccountInfo /> : <ProjectInfo />}
        </div>
    )
}

export default Profile;