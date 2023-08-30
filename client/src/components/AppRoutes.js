import React from 'react';
import PostsList from '../features/posts/PostsList';
import PostDetails from '../features/posts/PostDetails';
import { Routes, Route } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PostsList />} />
      <Route path='/posts/:id' element={<PostDetails />} />
      <Route path='/new' element={<h1>New Post</h1>} />
    </Routes>
  );
}

export default AppRoutes;