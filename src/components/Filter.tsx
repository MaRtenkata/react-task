import React, { useMemo } from 'react';
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
  const userIds = useMemo(() => {
    return [...new Set(posts.map((post) => post.userId))];
  }, [posts]);

  return (
    <>
      <select onChange={handleUserIdChange} value={userId || ''}>
        <option value=''>All</option>
        {userIds.map((id) => (
          <option key={id} value={id || ''}>
            User {id}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
