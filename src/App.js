import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';

const JSON_SERVER_URL = 'http://localhost:8000/tasks'


function App() {

  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(JSON_SERVER_URL)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {

    const res = await fetch(JSON_SERVER_URL, {
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task),
      method: 'POST'
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }


  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${JSON_SERVER_URL}/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {

    // update the task in json server
    const taskToToggle = tasks.find((task) => task.id === id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    fetch(`${JSON_SERVER_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header title="Mero Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAddButton={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
    </div>
  );
}

export default App;
