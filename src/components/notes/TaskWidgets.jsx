import React from 'react';
import './TaskWidgets.css'

const TaskWidgets = ({ completedTodos, pendingTodos }) => {
  return (
    <div className="task-widgets">
      <div className="widget">
        <h3>Completed Tasks</h3>
        <p id="completed">{completedTodos}</p>
      </div>
      <div className="widget">
        <h3>Pending Tasks</h3>
        <p id="pending">{pendingTodos}</p>
      </div>
    </div>
  );
};

export default TaskWidgets;
