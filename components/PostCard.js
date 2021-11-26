import { useState } from 'react';
import { useRouter } from 'next/router';

const PostCard = ({ post }) => {
  console.log('post: ', post)
  return (
    <>
      <li>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        <br />
        <button type="button">
          {'Publish'}
        </button>
        <button type="button" >
          {'Delete'}
        </button>
      </li>
    </>
  );
}

export default PostCard;