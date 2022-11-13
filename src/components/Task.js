import { FaTimes } from 'react-icons/fa';
import { BiPencil } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


const Task = ({ task, onDelete, onToggle }) => {

    const navigate = useNavigate()

    return (
        <div className={`task ? ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}
                <span>
                    <BiPencil className='icon' onClick={() => {
                        navigate(`/edit/${task.id}`, { state: { ...task } })
                    }} />
                    <FaTimes className='icon' onClick={(() => onDelete(task.id))} />
                </span>
            </h3>
            <p>
                {task.day}
            </p>
        </div>
    )
}

export default Task