import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

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
      setFormSubmitted(false);
      if (isOpen) {
        // Reset the internal state of the component when isOpen changes to true
        setValue("title", "");
        setValue("description", "");
      }
      if (taskData && taskData.id) {
        setValue("title", taskData.title);
        setValue("description", taskData.description);
      }
    }
    loadTask();
  }, [setValue, taskData, isOpen]);

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
            <div className="form-floating">
              <input
                className={`form-control ${
                  formSubmitted && errors.title ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
                defaultValue={taskData?.title}
              ></input>
              <label htmlFor="floatingInput">Title</label>
              {errors.title && (
                <div className="invalid-feedback">
                  Please enter the title of the task
                </div>
              )}
            </div>
            <div className="form-floating">
              <textarea
                className={`form-control h-auto mt-3 ${
                  formSubmitted && errors.description ? "is-invalid" : ""
                }`}
                placeholder="Description"
                rows={4}
                {...register("description", { required: true })}
                defaultValue={taskData?.description}
              ></textarea>
              <label htmlFor="floatingInput">Description</label>
              {errors.description && (
                <div className="invalid-feedback">
                  Please enter the description of the task
                </div>
              )}
            </div>
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
