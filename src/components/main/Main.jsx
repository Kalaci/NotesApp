import './Main.css';
import React, { useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import NoteForm from '../notes/NoteForm';
import NoteList from '../notes/NotesList';
import NewNoteButton from '../notes/NewNoteButton';
import NoteButtons from '../notes/NoteButtons';
import TaskWidgets from '../notes/TaskWidgets';

//reducer function to handle state changes for todos
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter(todo => todo.id !== action.payload);
    case 'UPDATE_TASK':
      return state.map(todo =>
        todo.id === action.payload.id ? action.payload : todo
      );
    default:
      return state;
  }
};

function Main() {
  const [showButtons, setShowButtons] = useState(false);
  const [updateButtons, setUpdateButtons] = useState(false);
  const [showFields, setShowFields] = useState(false); 
  const [todoTitle, settodoTitle] = useState('');
  const [todoContent, settodoContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [filterText, setFilterText] = useState(''); 
  const [statusFilter, setStatusFilter] = useState('all');

  // UseReducer setup
  const [todos, dispatch] = useReducer(todoReducer, []);

  // Fetch todos on initial render
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:8080/todos');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        dispatch({ type: 'SET_TODOS', payload: data });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Filtered todos based on search text and status filter
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(filterText.toLowerCase()) ||
        todo.description.toLowerCase().includes(filterText.toLowerCase());

      const matchesStatus = (statusFilter === 'all') ||
        (statusFilter === 'completed' && todo.completed) ||
        (statusFilter === 'in-progress' && !todo.completed);

      return matchesSearch && matchesStatus;
    });
  }, [todos, filterText, statusFilter]);

  // Completed and pending tasks calculations
  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  const pendingTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  // Handle new note button click
  const handleNewNoteBtn = () => {
    settodoContent('');
    settodoTitle('');
    setIsCompleted(false);
    setShowButtons(true);
    setUpdateButtons(false); 
    setShowFields(true); 
  };

  // Handle closing the new note form
  const handleDeleteBtnNew = () => {
    setShowButtons(false);
    setShowFields(false);
  };

  // Handle adding a new note
  const handleAddBtn = useCallback(async () => {
    if(todoTitle === "" || todoContent === "") {
      alert("Please fill all fields");
      return;
    }

    const newTodo = {
      title: todoTitle,
      description: todoContent,
      completed: false,
    };

    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      const addedTodo = await response.json();
      dispatch({ type: 'ADD_TASK', payload: addedTodo }); // Dispatch ADD_TASK
      setShowButtons(false);
      setShowFields(false);
      settodoTitle('');
      settodoContent('');
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  }, [todoTitle, todoContent]);

  // Open an existing note for editing
  const openNote = (todo) => {
    setShowButtons(false);
    setShowFields(true);
    setSelectedNote(todo);
    settodoTitle(todo.title);
    settodoContent(todo.description);
    setIsCompleted(todo.completed);
    setUpdateButtons(true);
  };

  // Handle deleting a note
  const handleDeleteBtnUpdate = useCallback(async () => {
    try {
      await fetch(`http://localhost:8080/todos/${selectedNote.id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'DELETE_TASK', payload: selectedNote.id }); // Dispatch DELETE_TASK
      setUpdateButtons(false);
      setShowFields(false);
      setSelectedNote(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, [selectedNote]);

  // Handle updating a note
  const handleUpdateButton = useCallback(async () => {
    if(todoTitle === "" || todoContent === "") {
      alert("Please fill all fields");
      return;
    }

    const updatedTodo = {
      ...selectedNote,
      title: todoTitle,
      description: todoContent,
      completed: isCompleted,
    };

    try {
      const response = await fetch(`http://localhost:8080/todos/${selectedNote.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      const updatedTodoFromServer = await response.json();
      dispatch({ type: 'UPDATE_TASK', payload: updatedTodoFromServer }); // Dispatch UPDATE_TASK

      settodoTitle('');
      settodoContent('');
      setIsCompleted(false);
      setSelectedNote(null);
      setUpdateButtons(false);
      setShowFields(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }, [selectedNote, todoTitle, todoContent, isCompleted]);

  // Handlers for form input changes
  const handleTitle = useCallback((e) => {
    settodoTitle(e.target.value);
  }, []);

  const handleContent = (e) => {
    settodoContent(e.target.value);
  };

  const handleCompletion = (e) => {
    setIsCompleted(e.target.checked);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div id='mainBody'>
      <div id="notesSideBar">
        <div id="notesSideBarTop" style={{display: 'flex', flexDirection: 'row', gap: "5vw"}}>
          <NewNoteButton onClick={handleNewNoteBtn} />
          <TaskWidgets completedTodos={completedTodos} pendingTodos={pendingTodos} />
        </div>
        {showFields && (
          <NoteForm
            title={todoTitle}
            content={todoContent}
            completed={isCompleted}
            onTitleChange={handleTitle}
            onContentChange={handleContent}
            onChangeCompletion={handleCompletion}
            isUpdateMode={updateButtons}
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
        <div id="notesDashboardHeader">
          <h1 id="notedHeader">TO DO</h1>
          <input 
            type="text" 
            placeholder="Search tasks" 
            value={filterText} 
            onChange={handleFilterChange} 
          />
          <select value={statusFilter} onChange={handleStatusFilterChange} id="statusFilterMenu">
            <option value="all">All</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <NoteList notes={filteredTodos} onSelect={openNote} />
      </div>
    </div>
  );
}

export default Main;
