import React from 'react';
import './App.css';
import PostsList from './features/posts/PostsList'; 

function App() {
  return (
    <div className="App">
      <h1>React on Rails App</h1>
      <p>Find the layout in client/src/App.jsx</p>

      <PostsList />
    </div>
  );
}

export default App;
