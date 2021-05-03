import axios from "axios";
import { useEffect, useState } from "react";
import env from 'react-dotenv';
import Comment from '../components/Comment';

const TaskDetails = (props) =>
{
    // states
    const [task, setTask] = useState({});
    const [commentId, setCommentId] = useState(null);

    // functions
    const getTaskDetails = () =>
    {
        axios.get(`${env.BACKEND_URL}/tasks/${props.taskId}`).then((res) =>
        {
            // console.log(res);
            setTask(res.data.task);
        }).catch((error) => console.log(error.message));
    }
    useEffect(getTaskDetails, []);

    const getComment = (commentId) =>
    {
        return task.comments.map(comment =>
        {
            return comment.id === commentId ? comment : null
        })
    }

    return (
        <div className="taskDetailsPage">
            <div className="taskDetails">
                {task ?
                    <div>
                        {/* {console.log(task)} */}
                        <h3>{task.description} | Due: {task.dueDate ? task.dueDate : 'TBD'}</h3>
                        <h5>Assigned to: {task.user ? task.user.name : 'TBD'}</h5>
                        <div className="comments">
                            <h4>Comments:</h4>
                            
                            <>
                                {task.comments ? 
                                    task.comments.length === 0 ?  
                                        'No comments' 
                                        : 
                                        task.comments.map(comment =>
                                        {
                                            return <Comment key={comment.id} user={comment.users[0]} comment={getComment(comment.id)}/>
                                        })
                                    :
                                    'Loading comments'
                                }
                            </>
                        </div>
                    </div>
                    :
                    <div>Loading task...</div>
                }
            </div>
        </div>
    )
}

export default TaskDetails;