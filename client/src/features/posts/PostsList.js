import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      // ``
      try{
        const response = await fetch(API_URL);
        // const response = await fetch('http://localhost:3000/api/v1/posts', {
        //   method: 'POST',
        //   headers: {
        //     accept: 'application/json',
        //   },
        // });

        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error ocurred. mmmmm...");
        console.log("An error ocurred", e);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;