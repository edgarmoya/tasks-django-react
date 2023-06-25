import React, { useEffect, useState } from "react";
import TasksList from "../components/TasksList";
import { getAllTasks } from "../api/tasks.api";
import Navbar from "../components/Navbar";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    async function loadTask() {
      const res = await getAllTasks();
      setTasks(res.data);
      setFilteredTasks(res.data);
    }
    loadTask();
  }, []);

  const handleSearch = (searchValue) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleDeleteTask = async (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <React.Fragment>
      <Navbar onSearch={handleSearch} onClear={() => setFilteredTasks(tasks)} />
      <TasksList tasks={filteredTasks} onTaskDeleted={handleDeleteTask} />
    </React.Fragment>
  );
}

export default TasksPage;
