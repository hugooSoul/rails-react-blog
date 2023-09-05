import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPost, updatePost } from '../../services/postService';

function PostEditForm () {
  const [post, setPost] = useState(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        setPost(json);
      } catch (e) {
        console.log("An error ocurred", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title: post.title,
      body: post.body
    };
    
    try {
      const json = await updatePost(id, updatedPost);
      navigate(`/posts/${json.id}`);
    } catch (e) {
      console.log("Failed to update post:", e);
    }
  }

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor='post-title'>Title:</label>
          <input id='post-title' type='text' value={post.title} onChange={(e) => setPost({...post, title: e.target.value})} required />
        </div>
        <div>
          <label htmlFor='post-body'>Body:</label>
          <textarea id='post-body' value={post.body} onChange={(e) => setPost({...post, body: e.target.value})} required />
        </div>
        <div>
          <button type='submit'>Update</button>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm;