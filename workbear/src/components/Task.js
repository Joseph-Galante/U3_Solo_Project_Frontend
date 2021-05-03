import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import env from 'react-dotenv';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Redirect } from 'react-router';

const Task = (props) =>
{
    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [assigned, setAssigned] = useState({});
    const [shouldRedirect, setShouldRedirect] = useState('');

    // functions
    const assignTask = (email) =>
    {
        axios.post(`${env.BACKEND_URL}/tasks/${props.task[0].id}/assign`, { email }, { headers: { Authorization: user.id }}).then((res) =>
        {
            // console.log(res);
            displayMessage(true, `${email} has been assigned to task successfully.`);
        }).catch(error => console.log(error.message));
    }

    return (
        <div className="task" onClick={() => {setShouldRedirect(props.task[0].id)}}>
            {shouldRedirect !== '' ? <Redirect to={`/tasks/${shouldRedirect}`}/> : null}
            <span>
                {/* {console.log(props.task[0])} */}
                { props.task ?
                <>
                    <span>{props.task[0].description ? props.task[0].description : 'Project Task'} | Assigned to: </span>
                    {
                    user.email === props.users[0].email ?
                        <Dropdown  options={props.users ? props.users.map(user => {return `${user.name}`}) : 'TBD'} onChange={(e) => {setAssigned(e.value); assignTask(e.value)}} value={props.task[0].user ? props.task[0].user.name : assigned.name} placeholder='TBD' />
                    :
                        
                        <input type="button" value="Assign Self" onClick={() => {assignTask(user.email)}}/>
                    }
                </>
                :
                'Loading task...'
                }
            </span>
        </div>
    )
}

export default Task;