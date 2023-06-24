import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalConfirmDelete from "./ModalConfirmDelete";
import { deleteTask } from "../api/tasks.api";
import { toast } from "react-hot-toast";

function TaskCard({ task, onTaskDeleted }) {
  const navigate = useNavigate();
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const handleDeleteTask = async (e) => {
    await deleteTask(task.id);
    toast.success("Deleted task", {
      position: "bottom-right",
    });
    onTaskDeleted(task.id);
  };

  return (
    <React.Fragment>
      <div className="card shadow card-body p-3">
        <h2 className="fw-bold">{task.title}</h2>
        <p className="text-slate h-100">{task.description}</p>
        <div className="row">
          <button
            className="col btn btn-primary mx-2"
            onClick={() => {
              navigate(`/tasks/${task.id}`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => setModalDeleteIsOpen(true)}
            className="col btn btn-danger mx-2"
          >
            Delete
          </button>
          <ModalConfirmDelete
            isOpen={modalDeleteIsOpen}
            onClose={() => {
              setModalDeleteIsOpen(false);
            }}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TaskCard;
