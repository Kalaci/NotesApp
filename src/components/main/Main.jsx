import './Main.css';
import React, { useState } from 'react';
import NoteForm from '../notes/NoteForm';
import NoteList from '../notes/NotesList';
import NewNoteButton from '../notes/NewNoteButton';
import NoteButtons from '../notes/NoteButtons';

function Main() {

  const [showButtons, setShowButtons] = useState(false);
  const [updateButtons, setUpdateButtons] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedNote, setSelectedNote ] = useState();


  const handleNewNoteBtn = () =>{
    setNoteContent('');
    setNoteTitle('');
    setShowButtons(true);
    setUpdateButtons(false); 
    setShowFields(true); 
  };

  const handleDeleteBtnNew = () => {
    setShowButtons(false);
    setShowFields(false);
  };

  const handleAddBtn = () =>{
      const newNote = {
        title: noteTitle,
        content: noteContent,
      };

      setNotes([...notes, newNote]);
      setShowButtons(!showButtons);
      setShowFields(!showFields);
  };

  const openNote = (note) => {
    setShowButtons(false);
    setShowFields(true);
    setSelectedNote(note);

    const title = note.title;
    const content = note.content;

    setNoteTitle(title);
    setNoteContent(content);
    setUpdateButtons(!updateButtons);

  };

  const handleDeleteBtnUpdate = () => {
    
    const removedNote = notes.filter( note => note !== selectedNote);
    setNotes(removedNote);
    
    setUpdateButtons(!updateButtons);
    setShowFields(!showFields);
  };

  const handleUpdateButton = () => {
    const updatedNotes = notes.map(note => 
      note === selectedNote 
          ? { ...note, title: noteTitle, content: noteContent } 
          : note
  );

  setNotes(updatedNotes);

  setNoteTitle('');
  setNoteContent('');
  setSelectedNote(null);
  setUpdateButtons(false);
  setShowFields(false);
  }

  const handleTitle = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleContent = (e) => {
    setNoteContent(e.target.value);
  };

  return (
    <div id='mainBody'>
      <div id="notesSideBar">
         
      <NewNoteButton onClick={handleNewNoteBtn} />

        {showFields && (
          <NoteForm
            title={noteTitle}
            content={noteContent}
            onTitleChange={handleTitle}
            onContentChange={handleContent}
          />
         )}
        <NoteButtons
          onAdd={handleAddBtn}
          onDeleteNew={handleDeleteBtnNew}
          onUpdate={handleUpdateButton}
          onDeleteUpdate={handleDeleteBtnUpdate}
          showAdd={showButtons}
          showUpdate={updateButtons}
        />

      </div>
      <div id="notesDashboard">
        <h1 id="notedHeader"> NOTES </h1>
        <NoteList notes={notes} onSelect={openNote} />
      </div>
    </div>
  );
}

export default Main;
