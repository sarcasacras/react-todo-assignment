import React from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import AddPostForm from './components/AddPostForm';

function App() {
  return (
    <div className="App">
      <AddPostForm />
      <Posts />
    </div>
  );
}
export default App;
