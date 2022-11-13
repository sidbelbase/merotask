import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, onEdit }) => {
    return (
        <>
            {tasks.length > 0 ?
                tasks.map((task) => (
                    <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
                ))
                : 'No Tasks to Show'
            }
        </>
    )
}

export default Tasks