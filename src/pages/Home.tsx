import { useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import styles from '../styles/Home.module.css';
import Pagination from '../components/Paginator';

import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import { getPageNumbers } from '../utils/getPageNumbers';

export interface PostProps {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const TEST_URL = 'https://jsonplaceholder.typicode.com';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState<number | undefined>();
  const postPerPage = 20;

  const url = userId
    ? `${TEST_URL}/posts?userId=${userId}`
    : `${TEST_URL}/posts`;

  const { data, loading } = useFetch(url);

  const postData = useMemo(() => {
    const posts: PostProps[] = data;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    return posts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, data]);

  const userIds = useMemo(() => {
    return [...new Set(postData.map((post) => post.userId))];
  }, [postData]);

  const pageNumbers = getPageNumbers(data.length, postPerPage);

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
                <div className={styles.postContainer} key={post.id}>
                  <h4 className={styles.postTitle}>{post.title}</h4>
                  <div className={styles.separator}></div>
                  <p>{post.body}</p>
                </div>
              ))}
          <Pagination
            handlePageNumberClick={handlePageNumberClick}
            pageNumbers={pageNumbers}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
