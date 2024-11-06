import { useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import styles from '../styles/Home.module.css';
import Pagination from '../components/Paginator';
import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Post, { PostProps } from '../components/Post';
import { API_URL, POST_PER_PAGE } from '../config';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState<number>();

  const url = userId ? `${API_URL}/posts?userId=${userId}` : `${API_URL}/posts`;

  const { data, loading, error } = useFetch(url);

  const postData = useMemo(() => {
    const indexOfLastPost = currentPage * POST_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POST_PER_PAGE;

    return data.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, data]);

  const userIds = useMemo(() => {
    return [...new Set(postData.map((post: PostProps) => post.userId))];
  }, [postData]);

  const handlePageNumberClick = (pageNumber: number) =>
    setCurrentPage(pageNumber);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Post list</h2>
        <Filter
          options={userIds}
          value={userId}
          handleUserIdChange={handleUserIdChange}
        />
        <div>
          {loading
            ? 'Loading...'
            : postData.map((post: PostProps) => (
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  userId={userId}
                />
              ))}
          {error && 'An error occured'}
          <Pagination
            handlePageNumberClick={handlePageNumberClick}
            pageNumbers={calcPageNumbers(data.length, POST_PER_PAGE)}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

const calcPageNumbers = (totalPosts: number, postPerPage: number) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

export default Home;
