import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { getTask } from "../api/tasks.api";

function ModalCreateTask({ isOpen, onClose, onCreate, onUpdate, taskData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    async function loadTask() {
      if (taskData) {
        const {
          data: { title, description },
        } = await getTask(taskData.id);
        setValue("title", title);
        setValue("description", description);
      } else {
        setValue("title", "");
        setValue("description", "");
      }
      setFormSubmitted(false); // Restablecer el estado de formSubmitted
    }
    loadTask();
  }, [setValue, taskData]);

  const handleSaveTask = async (data) => {
    setIsLoading(true);

    if (taskData && taskData.id) {
      await onUpdate(taskData.id, data);
    } else {
      await onCreate(data);
    }

    setIsLoading(false);
    handleCloseModal();
  };

  const handleFormSubmit = (data) => {
    setFormSubmitted(true);
    handleSubmit(handleSaveTask)(data);
  };

  const handleCloseModal = () => {
    reset();
    setFormSubmitted(false);
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        title={taskData ? "Edit Task" : "Create New Task"}
        onClose={handleCloseModal}
      >
        <div className="modal-body">
          <form onSubmit={handleFormSubmit}>
            <input
              className={`form-control mt-3 ${
                formSubmitted && errors.title ? "is-invalid" : ""
              }`}
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              defaultValue={taskData?.title}
            ></input>
            <textarea
              className={`form-control mt-3 ${
                formSubmitted && errors.description ? "is-invalid" : ""
              }`}
              placeholder="Description"
              rows={3}
              {...register("description", { required: true })}
              defaultValue={taskData?.description}
            ></textarea>
          </form>
        </div>
        <div className="modal-footer">
          <button
            onClick={handleCloseModal}
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            onClick={handleFormSubmit}
            disabled={isLoading}
            type="button"
            className="btn btn-primary"
          >
            {isLoading ? "Saving..." : taskData ? "Update Task" : "Create Task"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCreateTask;
