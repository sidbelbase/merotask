import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const EditTask = ({ onEdit }) => {

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState(state.text);
  const [day, setDay] = useState(state.day);
  const [reminder, setReminder] = useState(state.reminder);

  console.log(state)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Task cannot be empty!')
      return
    }

    onEdit(id, { text, day, reminder });
    navigate('/')

  }

  return (
    <form className="add-task" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type="text" placeholder="Add Task" value={text} onChange={
          (e) => setText(e.target.value)
        } />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input type="text" placeholder="Add Day & Time" value={day} onChange={
          (e) => setDay(e.target.value)
        } />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" checked={reminder} value={reminder} onChange={
          (e) => setReminder(e.currentTarget.checked)
        } />
      </div>

      <input type="submit" value="Update Task" className="btn btn-block" />
    </form>
  )
}

export default EditTask