import { React, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { getAllTasks } from "../api/tasks.api";

function TasksList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTask() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTask();
  }, []);

  const handleDeleteTask = async (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="row my-4">
      {tasks.map((task) => (
        <div key={task.id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex">
          <TaskCard task={task} onTaskDeleted={handleDeleteTask} />
        </div>
      ))}
    </div>
  );
}

export default TasksList;
