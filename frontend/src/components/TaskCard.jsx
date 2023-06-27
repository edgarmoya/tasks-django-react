import React from "react";
import IconsCards from "../images/IconsCards";

function TaskCard({ task, onTaskDeleted, onTaskUpdated, onTaskChecked }) {
  const handleDeleteTask = async (e) => {
    onTaskDeleted(task);
  };

  const handleEditTask = () => {
    onTaskUpdated(task);
  };

  const handleCheckTask = () => {
    onTaskChecked(task);
  };

  return (
    <React.Fragment>
      <div className="card shadow card-body p-3">
        <div className="row">
          <div className="col">
            <span className="badge float-start text-bg-primary opacity-75">
              {task.done ? "Done" : "To Do"}
            </span>
          </div>
          <div className="col-auto">
            <a className="d-flex align-items-center" data-bs-toggle="dropdown">
              <IconsCards.ThreeDotsVertical className="text-primary" />
            </a>
            <div className="dropdown">
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={handleCheckTask}>
                    <IconsCards.CheckFill className="me-2" />{" "}
                    {task.done ? "To Do" : "Done"}
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleEditTask}>
                    <IconsCards.PenFill className="me-2" /> Edit
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleDeleteTask}>
                    <IconsCards.TrashFill className="me-2" /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h2 className="fw-bold">{task.title}</h2>
        <p className="text-slate h-100">{task.description}</p>
      </div>
    </React.Fragment>
  );
}

export default TaskCard;
