import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import env from 'react-dotenv';
import Task from '../components/Task';

const ProjectDetails = (props) =>
{
    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [email, setEmail] = useState('');
    const [project, setProject] = useState({});
    const [taskId, setTaskId] = useState(null);
    const [inviting, setInviting] = useState(false);

    // on component load
    useEffect(clearMessage, []);

    // functions
    const getProjectDetails = () =>
    {
        axios.get(`${env.BACKEND_URL}/projects/${props.projectId}`).then((res) =>
        {
            // console.log(res);
            setProject(res.data.project);
        }).catch((error) => console.log(error.message));
    }
    useEffect(getProjectDetails, []);

    const getTask = (taskId) =>
    {
        return project.tasks.map(task =>
        {
            return task.id === taskId ? task : null
        })
    }

    const inviteCollaborator = (e) =>
    {
        e.preventDefault();

        axios.post(`${env.BACKEND_URL}/projects/${project.id}/collaborators`, { email: email, message: `${user.name} has invited you to work on ${project.title}` }, { headers: { Authorization: user.id } }).then((res) =>
        {
            console.log(res);
            displayMessage(true, 'Collaboration invite sent.');
            setInviting(false);
        }).catch(error => 
        {
            console.log(error.message);
            // check if error was conflict from duplicate invites
            if (error.message === 'Request failed with status code 409')
            {
                displayMessage(false, 'User has already been invited to this project.');
            }
        })
    }

    return (
        <div className="projectDetailsPage">
            {inviting ? 
            <div className="inviteDetails">
                <input type="button" id="backToProject" value="Back" onClick={() => {setInviting(false)}}/>
                <h2>Invite A Collaborator</h2>
                <p>Enter the email of the user you want to invite to the project. Make sure this is correct so random users don't get added to your project.</p>
                <form className="inviteForm" onSubmit={inviteCollaborator}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <div></div>
                        <input id="email" type="text" value={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <input type="button" value="Send Invite" onClick={inviteCollaborator}/>
                </form>
            </div>
            :
            <div className="projectDetails">
                {project ?
                    <div>
                        {/* {console.log(project)} */}
                        <h1>{project.title}</h1>
                        <h3>{project.description} | Due: {project.dueDate ? project.dueDate : 'TBD'}</h3>
                        <div className="collaborators">
                            <h2>Collaborators:</h2>
                            <div className="collabSection">
                                <div className="collaborator">
                                    <h4>{project.users ? project.users.map((user) => {return (<div key={user.id}>{user.name}<br></br></div>)}) : null}</h4>
                                </div>
                            </div>
                            <input type="button" value="Add Collaborator" onClick={() => {setInviting(true)}}/>
                        </div>
                        <div className="tasks">
                            <h4>Tasks:</h4>
                            <>
                                {project.tasks ? 
                                    project.tasks.length === 0 ?  
                                        'No tasks' 
                                        : 
                                        project.tasks.map(task =>
                                        {
                                            return <Task key={task.id} users={project.users} task={getTask(task.id)} />
                                        })
                                    :
                                    'Loading tasks'
                                }
                            </>
                        </div>
                    </div>
                    :
                    <div>Loading project...</div>
                }
            </div>
            }
        </div>
    )
}

export default ProjectDetails;