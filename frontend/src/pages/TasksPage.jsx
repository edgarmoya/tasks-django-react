import React, { useEffect, useState, useContext } from "react";
import TasksList from "../components/TasksList";
import Navbar from "../components/Navbar";
import ModalCreateTask from "../components/ModalCreateTask";
import ModalConfirmDelete from "../components/ModalConfirmDelete";
import { showSuccessToast } from "../utils/toastUtils";
import TaskService from "../api/tasks.api";
import { AuthContext } from "../contexts/authContext";
import Pagination from "../components/Pagination";

function TasksPage() {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(1);

  const loadFilteredTasks = async () => {
    try {
      const tasksForPage = await TaskService.getTasksForPage(
        authTokens,
        currentPage
      );
      console.log(tasksForPage.data.results);
      setTasks(tasksForPage.data.results);
      setFilteredTasks(tasksForPage.data.results);
      setTotalTasks(tasksForPage.data.count);
    } catch (error) {
      console.error("Error fetching tasks for page:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    loadFilteredTasks();
  }, [currentPage]);

  const handleCreateTask = async (data) => {
    // TODO: Add message error (try catch)
    await TaskService.createTask(authTokens, data);
    showSuccessToast("Task created");
    loadFilteredTasks(); // Refetch tasks after creating a new task
    setModalCreateIsOpen(false); // Close the modal
  };

  const handleUpdateTask = async (taskId, task) => {
    // TODO: Add message error (try catch)
    await TaskService.updateTask(authTokens, taskId, task);
    showSuccessToast("Task updated");
    loadFilteredTasks();
    setSelectedTask(null);
    setModalCreateIsOpen(false);
  };

  const handleSelectUpdateTask = async (task) => {
    setSelectedTask(task);
    setModalCreateIsOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    // TODO: Add message error (try catch)
    await TaskService.deleteTask(authTokens, taskId);
    showSuccessToast("Task deleted");
    loadFilteredTasks();
    setSelectedTask(null);
    setModalDeleteIsOpen(false);
  };

  const handleSelectDeleteTask = async (task) => {
    setSelectedTask(task);
    setModalDeleteIsOpen(true);
  };

  const handleCheckTask = async (task) => {
    // TODO: Add message error (try catch)
    await TaskService.checkTask(authTokens, task.id, task.done);
    showSuccessToast("Task updated");
    loadFilteredTasks();
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
        onLogout={logoutUser}
      />

      {/* Render the modal component outside the Navbar*/}
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

      <div className="tasks-container container mx-auto">
        <TasksList
          tasks={filteredTasks}
          onTaskDeleted={handleSelectDeleteTask}
          onTaskUpdated={handleSelectUpdateTask}
          onTaskChecked={handleCheckTask}
        />
        <Pagination
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalTasks={totalTasks}
        />
      </div>
    </React.Fragment>
  );
}

export default TasksPage;
