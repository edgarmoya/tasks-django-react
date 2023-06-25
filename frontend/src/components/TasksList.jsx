import React from "react";
import TaskCard from "./TaskCard";

function TasksList({ tasks, onTaskDeleted }) {
  return (
    <div className="row my-4">
      {tasks.map((task) => (
        <div key={task.id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex">
          <TaskCard task={task} onTaskDeleted={onTaskDeleted} />
        </div>
      ))}
    </div>
  );
}

export default TasksList;
