import React from "react";
import TaskCard from "./TaskCard";

function TasksList({ tasks, onTaskDeleted, onTaskUpdated }) {
  const handleTaskUpdated = (task) => {
    onTaskUpdated(task);
  };

  const handleTaskDeleted = (task) => {
    onTaskDeleted(task);
  };

  return (
    <div className="row my-4">
      {tasks.map((task) => (
        <div key={task.id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex">
          <TaskCard
            task={task}
            onTaskDeleted={handleTaskDeleted}
            onTaskUpdated={handleTaskUpdated}
          />
        </div>
      ))}
    </div>
  );
}

export default TasksList;
