import React from "react";

function TaskCard({ task, onTaskDeleted, onTaskUpdated }) {
  const handleDeleteTask = async (e) => {
    onTaskDeleted(task);
  };

  const handleEditTask = () => {
    onTaskUpdated(task);
  };

  return (
    <React.Fragment>
      <div className="card shadow card-body p-3">
        <h2 className="fw-bold">{task.title}</h2>
        <p className="text-slate h-100">{task.description}</p>
        <div className="row">
          <button className="col btn btn-primary mx-2" onClick={handleEditTask}>
            Edit
          </button>
          <button
            onClick={handleDeleteTask}
            className="col btn btn-danger mx-2"
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TaskCard;
