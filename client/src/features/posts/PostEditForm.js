import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../constants';

function PostEditForm () {
  const [post, setPost] = useState(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
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

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body
        }),
      });

      if (response.ok) {
        const json = await response.json();
        navigate(`/posts/${id}`);
      } else {
        throw response;
      }
    } catch (e) {
      console.log("An error ocurred.");
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