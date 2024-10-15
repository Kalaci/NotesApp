import React from 'react';

function NoteList({ notes, onSelect }) {
  return (
    <div id="notesList">
      {notes.map((note, index) => (
        <div id="note" key={index} onClick={() => onSelect(note)}>
          <h5 id="noteTile">{note.title}</h5>
          <h6 id="noteContent">{note.content}</h6>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
