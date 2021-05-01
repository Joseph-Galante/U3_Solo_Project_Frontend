import axios from "axios";
import { useEffect, useState } from "react";
import env from 'react-dotenv';


const ProjectDetails = (props) =>
{
    // states
    const [project, setProject] = useState({});

    // functions
    const getProjectDetails = () =>
    {
        axios.get(`${env.BACKEND_URL}/projects/${props.projectId}`).then((res) =>
        {
            console.log(res);
            setProject(res.data.project);
        }).catch((error) => console.log(error.message));
    }
    useEffect(getProjectDetails, []);

    return (
        <div className="projectDetailsPage">
            {project ?
                <div>
                    <h1>{project.title}</h1>
                    <h3>{project.description}</h3>
                    <h2>Collaborators:</h2>
                    <h3>{project.users ? project.users.map((user) => {return (<div key={user.id}>{user.name}<br></br></div>)}) : null}</h3>
                    <h2>Due:</h2>
                    <h3>{project.dueDate ? project.dueDate : 'No Due Date'}</h3>
                </div>
                :
                <div>Loading project...</div>
            }
        </div>
    )
}

export default ProjectDetails;