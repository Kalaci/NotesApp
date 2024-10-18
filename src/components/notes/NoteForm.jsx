import React, { memo } from "react";

const NoteForm = memo(({ title, content, completed, onTitleChange, onContentChange, onChangeCompletion, isUpdateMode }) => {
  return (
    <div id="noteInfo">
      <input 
        type="text" 
        id="title" 
        placeholder="Enter title" 
        onChange={onTitleChange} 
        value={title}
      />
      <textarea 
        type="text" 
        id="text" 
        placeholder="Enter text" 
        onChange={onContentChange} 
        value={content}
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h5 style={{ margin: 0, width: '10vh', paddingTop: "5px" }}>Completed</h5>
        <input 
          type="checkbox" 
          onChange={onChangeCompletion}
          checked={completed}
          disabled={!isUpdateMode}  
        />
      </div>
    </div>
  );
});

export default NoteForm;
