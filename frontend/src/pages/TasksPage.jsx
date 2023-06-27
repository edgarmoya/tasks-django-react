import React, { useEffect, useState } from "react";
import TasksList from "../components/TasksList";
import Navbar from "../components/Navbar";
import ModalCreateTask from "../components/ModalCreateTask";
import ModalConfirmDelete from "../components/ModalConfirmDelete";
import { showSuccessToast } from "../utils/toastUtils";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} from "../api/tasks.api";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getAllTasks();
    setTasks(res.data);
    setFilteredTasks(res.data);
  };

  const handleCreateTask = async (data) => {
    /* TODO: Add message error (try catch) */
    await createTask(data);
    showSuccessToast("Task created");
    loadTasks(); // Refetch tasks after creating a new task
    setModalCreateIsOpen(false); // Close the modal
  };

  const handleUpdateTask = async (taskId, task) => {
    /* TODO: Add message error (try catch) */
    await updateTask(taskId, task);
    showSuccessToast("Task updated");
    loadTasks();
    setSelectedTask(null);
    setModalCreateIsOpen(false);
  };

  const handleSelectUpdateTask = async (task) => {
    setSelectedTask(task);
    setModalCreateIsOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    /* TODO: Add message error (try catch) */
    await deleteTask(taskId);
    showSuccessToast("Task deleted");
    loadTasks();
    setSelectedTask(null);
    setModalDeleteIsOpen(false);
  };

  const handleSelectDeleteTask = async (task) => {
    setSelectedTask(task);
    setModalDeleteIsOpen(true);
  };

  const handleSearch = (searchValue) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <React.Fragment>
      <Navbar
        onSearch={handleSearch}
        onClear={() => setFilteredTasks(tasks)}
        onCreate={() => setModalCreateIsOpen(true)}
      />

      {/* Render the modal component outside the Navbar */}
      <ModalCreateTask
        isOpen={modalCreateIsOpen}
        onClose={() => {
          setModalCreateIsOpen(false);
          setSelectedTask(null);
        }}
        onCreate={handleCreateTask}
        onUpdate={handleUpdateTask}
        taskData={selectedTask}
      />

      <ModalConfirmDelete
        isOpen={modalDeleteIsOpen}
        onClose={() => {
          setModalDeleteIsOpen(false);
          setSelectedTask(null);
        }}
        onDelete={handleDeleteTask}
        taskData={selectedTask}
      />

      <div className="tasks-container">
        <TasksList
          tasks={filteredTasks}
          onTaskDeleted={handleSelectDeleteTask}
          onTaskUpdated={handleSelectUpdateTask}
        />
      </div>
    </React.Fragment>
  );
}

export default TasksPage;
