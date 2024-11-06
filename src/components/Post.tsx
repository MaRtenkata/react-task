import React from 'react';
import styles from '../styles/Post.module.css';

export interface PostProps {
  id: number;
  userId?: number;
  title: string;
  body: string;
}

const Post: React.FC<PostProps> = ({ title, body }) => {
  return (
    <div className={styles.postContainer}>
      <h4 className={styles.postTitle}>{title}</h4>
      <div className={styles.separator}></div>
      <p>{body}</p>
    </div>
  );
};

export default Post;
