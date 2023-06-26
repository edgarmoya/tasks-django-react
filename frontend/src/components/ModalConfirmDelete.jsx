import { React, useState } from "react";
import Modal from "./Modal";

function ModalConfirmDelete({ isOpen, onClose, onDelete, taskData }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(taskData.id);
    setIsLoading(false);
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} title={"Are you sure?"} onClose={onClose}>
        <div className="modal-body">
          You are about to delete task{" "}
          <strong>{taskData && taskData.title}</strong>.
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalConfirmDelete;
