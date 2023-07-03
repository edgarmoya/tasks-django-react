import { React, useState } from "react";
import Modal from "./Modal";

function ModalConfirmLogout({ isOpen, onClose, onLogout }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await onLogout();
    setIsLoading(false);
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} title={"Are you sure?"} onClose={onClose}>
        <div className="modal-body">
          Are you sure you want to log out? Any unsaved changes will be lost.
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalConfirmLogout;
