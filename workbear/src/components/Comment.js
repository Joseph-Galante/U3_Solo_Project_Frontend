import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import env from 'react-dotenv';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Comment = (props) =>
{
    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    return (
        <div className="comment">
            <span>
                { props.comment ?
                <>
                    <span>
                        <div className="commentStamp">{props.comment[0].users[0].name}</div>
                        {props.comment[0].description ? props.comment[0].description : 'Task Comment'}
                    </span>
                </>
                :
                'Loading comment...'
                }
            </span>
        </div>
    )
}

export default Comment;