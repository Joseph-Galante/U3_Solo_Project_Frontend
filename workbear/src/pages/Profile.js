// contexts
import { useState, useEffect, useContext } from 'react';
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';

const Profile = () =>
{
    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);
    
    // on component load
    useEffect(clearMessage, []);

    return (
        <div>
            <h1>{user.name}'s Profile</h1>
            <div>
                
            </div>
        </div>
    )
}

export default Profile;