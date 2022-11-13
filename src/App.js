import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${JSON_SERVER_URL}/${id}`)
    if (!res.ok) alert('Could not fetch the data for that resource')
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

  // EditTask
  const editTask = async (id, body) => {

    const theTask = await fetchTask(id);

    if (theTask) {
      const res = await fetch(`${JSON_SERVER_URL}/${id}`, {
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
        method: 'PUT'
      })

      const data = await res.json()
      setTasks(tasks.map((task) => task.id === data.id ? { ...data } : task));
    }
  }


  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${JSON_SERVER_URL}/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {

    // update the task in json server
    const taskToToggle = tasks.find((task) => task.id === id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    await fetch(`${JSON_SERVER_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: updatedTask.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header title="Mero Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAddButton={showAddTask} />
        <Routes>
          <Route path="/" element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onEdit={editTask} />
            </>
          } />
          <Route path='/about' element={<About />} />
          <Route path='/edit/:id' element={<EditTask onEdit={editTask} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
