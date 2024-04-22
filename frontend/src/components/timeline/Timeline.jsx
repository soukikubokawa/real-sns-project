import React, { useState, useEffect, useContext } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import '../../static/css/timeline.css';
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';

export default function Timeline({ userId }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const BACKEND_API = process.env.REACT_APP_BACKEND_API;
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = userId
      ? await axios.get(BACKEND_API + "/posts/profile/" + userId)
      : await axios.get(BACKEND_API + "/posts/timeline/" + user._id);
      // 投稿時間順に並べる
      setPosts(response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      }));
    };
    fetchPosts();
  }, [user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
        <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
