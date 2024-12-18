import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];
const getAllTasksApi = () => {
  return axios.get('http://127.0.0.1:5000/tasks')
    .then((response) => {
      const apiTasks = response.data;
      const newTasks = apiTasks.map(convertFromApi);
      return newTasks;
    })
    .catch(error => {
      console.log(error)
    });
};

const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete
  };
  delete newTask.is_complete;
  return newTask;
};


const App = () => {
  const [taskData, setTaskData] = useState([]);
  const getAllTasks = () => {
    getAllTasksApi().then(tasks => {
      setTaskData(tasks);
    });
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  const handleTaskComplete = (id) => {
    setTaskData((taskData) => taskData.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      } else {
        return task;
      }
    }));
  };

  const handleDeleteTask = (id) => {
    setTaskData((taskData) => taskData.filter((task) => {
      return task.id !== id;
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={taskData}
              onComplete={handleTaskComplete}
              onDelete={handleDeleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
