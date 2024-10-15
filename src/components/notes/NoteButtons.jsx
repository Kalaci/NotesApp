import React from 'react';

function NoteButtons({ onAdd, onDeleteNew, onUpdate, onDeleteUpdate, showAdd, showUpdate }) {
  return (
    <div id="buttonClass">
      {showAdd && <button onClick={onAdd}>Add Task</button>}
      {showAdd && <button onClick={onDeleteNew}>Delete</button>}
      {showUpdate && <button onClick={onUpdate}>Update</button>}
      {showUpdate && <button onClick={onDeleteUpdate}>Delete</button>}
    </div>
  );
}

export default NoteButtons;
