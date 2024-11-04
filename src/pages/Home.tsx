import { useState } from 'react';
// import FilterButtons from '../components/FilterButtons';
import useFetch from '../utils/hooks/useFetch';
import Pagination from '../components/Paginator';

export interface PostProps {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const TEST_URL = 'https://jsonplaceholder.typicode.com';

const Home: React.FC = () => {
  const { data, loading } = useFetch(`${TEST_URL}/posts`);
  const [currentPage, setCurrentPage] = useState(1);

  // const userIds = [...new Set(data.map((val: PostInterface) => val.userId))];

  const indexOfLastPost = currentPage * 20;
  const indexOfFirstPost = indexOfLastPost - 20;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageNumberClick = (pageNumber: number) =>
    setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Post list</h2>
      {/* <FilterButtons userIds={userIds} /> */}
      <div>
        {loading
          ? 'Loading...'
          : currentPosts.map((post: PostProps) => (
              <div key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.body.substring(0, 50)}</p>
              </div>
            ))}
        <Pagination
          totalPosts={data.length}
          postsPerPage={20}
          handlePageNumberClick={handlePageNumberClick}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Home;
