import React from 'react';
import './NoteList.css';

function NoteList({ notes, onSelect }) {
  return (
    <div id="notesList" >
      {notes.map((note) => (
        <div id="note" key={note.id} onClick={() => onSelect(note)}>
          <div >           
             <h4 id="noteTile">{note.title}</h4>
             <h6 id="noteContent" >{note.description}</h6>
             <p id="taskStatus">
              {note.completed ? 'Task Completed' : 'Task In Progress'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
