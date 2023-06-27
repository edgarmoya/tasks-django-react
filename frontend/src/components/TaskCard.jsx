import React from "react";
import IconsCards from "../images/IconsCards";

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
        <div className="row">
          <div className="col">
            <h2 className="fw-bold">{task.title}</h2>
          </div>
          <div className="col-auto">
            <a className="d-flex align-items-center" data-bs-toggle="dropdown">
              <IconsCards.ThreeDotsVertical className="text-primary" />
            </a>
            <div className="dropdown">
              <ul className="dropdown-menu">
                <li>
                  <div className="dropdown-item" onClick={handleEditTask}>
                    <IconsCards.PenFill className="text-primary me-2" /> Edit
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleDeleteTask}>
                    <IconsCards.TrashFill className="text-danger me-2" /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-slate h-100">{task.description}</p>
      </div>
    </React.Fragment>
  );
}

export default TaskCard;
