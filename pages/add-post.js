import { useState } from 'react';

import axios from 'axios';

import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError('');
    setMessage('');

    // fields check
    if (!title || !content) return setError('All fields are required');

    axios.post('/api/posts', { title, content, published: false, createdAt: new Date().toISOString() })
      .then(response => {
        // reset the fields
        setTitle('');
        setContent('');
        // set the message
        setMessage(response.data.message);
      })
      .catch(err => setError(response.data.message))
  };

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        <form onSubmit={handlePost} className={styles.form}>
          {error ? (
            <div className={styles.formItem}>
              <h3 className={styles.error}>{error}</h3>
            </div>
          ) : null}
          {message ? (
            <div className={styles.formItem}>
              <h3 className={styles.message}>{message}</h3>
            </div>
          ) : null}
          <div className={styles.formItem}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="title"
            />
          </div>
          <div className={styles.formItem}>
            <label>Content</label>
            <textarea
              name="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Post content"
            />
          </div>
          <div className={styles.formItem}>
            <button type="submit">Add post</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;