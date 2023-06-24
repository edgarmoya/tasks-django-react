import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function TaskFormPage() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Updated task", {
        position: "bottom-right",
      });
    } else {
      await createTask(data);
      toast.success("Created task", {
        position: "bottom-right",
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { title, description },
        } = await getTask(params.id);
        setValue("title", title);
        setValue("description", description);
      }
    }
    loadTask();
  }, [params.id, setValue]);

  return (
    <div className="container-xl mx-auto w-50">
      <form onSubmit={onSubmit}>
        <input
          className="form-control mt-3"
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
        ></input>
        {errors.title && <span>title is required</span>}
        <textarea
          className="form-control mt-3"
          placeholder="description"
          rows={3}
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>description is required</span>}
        <button className="btn btn-primary mt-3 w-100">Save</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
