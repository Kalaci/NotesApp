import React from 'react';
import './../main/Main.css';

function NoteForm({ title, content, onTitleChange, onContentChange }) {
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
    </div>
  );
}

export default NoteForm;
