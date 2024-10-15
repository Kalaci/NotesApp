import React from 'react';

function NewNoteButton({ onClick }) {
  return (
    <div id="newNote">
      <button id="newNoteBtn" onClick={onClick}>
        <span>+</span>
      </button>
    </div>
  );
}

export default NewNoteButton;
