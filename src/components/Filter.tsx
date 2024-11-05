import React from 'react';
import { PostProps } from '../pages/Home';

interface FilterButtonsInterface {
  userId: number | null;
  handleUserIdChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  posts: PostProps[];
}

const Filter: React.FC<FilterButtonsInterface> = ({
  userId,
  handleUserIdChange,
  posts,
}) => {
  return (
    <>
      <select onChange={handleUserIdChange} value={userId || ''}>
        <option value=''>All</option>
        {[...new Set(posts.map((post) => post.userId))].map((id) => (
          <option key={id} value={id || ''}>
            User {id}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
