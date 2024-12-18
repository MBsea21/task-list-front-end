import TaskList from "./components/TaskList.jsx";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm.jsx";
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
  return axios
    .get("http://127.0.0.1:5000/tasks")
    .then((response) => {
      const apiTasks = response.data;
      const newTasks = apiTasks.map(convertFromApi);
      return newTasks;
    })
    .catch((error) => {
      console.log(error);
    });
};

const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete,
  };
  delete newTask.is_complete;
  return newTask;
};

const deleteTaskApi = (id) => {
  return axios.delete(`http://127.0.0.1:5000/tasks/${id}`).catch((error) => {
    console.log(error);
  });
};

const markAsCompleteTaskApi = (id) => {
  return axios
    .patch(`http://127.0.0.1:5000/tasks/${id}/mark_complete`)
    .catch((error) => {
      console.log(error);
    });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const getAllTasks = () => {
    getAllTasksApi().then((tasks) => {
      setTaskData(tasks);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleTaskComplete = (id) => {
    markAsCompleteTaskApi(id);
    setTaskData((taskData) =>
      taskData.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      })
    );
  };

  const handleDeleteTask = (id) => {
    deleteTaskApi(id);
    setTaskData((taskData) =>
      taskData.filter((task) => {
        return task.id !== id;
      })
    );
  };

  // const addTaskData = (newTask) => {
  //   const nextId = Math.max(0, ...taskData.map((task) => task.id)) + 1;

  //   const newTaskList = [...taskData];
  //   newTaskList.push({ ...newTask, id: nextId });
  //   setTaskData(newTaskList);
  // }

  const addTaskData = (data) => {
    axios
      .post('http://127.0.0.1:5000/tasks', data)
      .then((result) => {
        setTaskData((prevTasks) => [convertFromApi(result.data), ...prevTasks]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
        <TaskForm addTaskData={addTaskData}/>
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
