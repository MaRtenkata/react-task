import { useMemo, useState } from 'react';
import useFetch from '../utils/hooks/useFetch';
import styles from '../styles/Home.module.css';
import Pagination from '../components/Paginator';

import Filter from '../components/Filter';

export interface PostProps {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const TEST_URL = 'https://jsonplaceholder.typicode.com';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);

  const url = userId
    ? `${TEST_URL}/posts?userId=${userId}`
    : `${TEST_URL}/posts`;

  const postPerPage = 20;

  const { data, loading } = useFetch(url);

  const postData = useMemo(() => {
    const posts = data;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    return posts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, data]);

  const handlePageNumberClick = (pageNumber: number) =>
    setCurrentPage(pageNumber);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value) || null);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.contanerTitle}>Post list</h2>
      <Filter
        posts={postData}
        handleUserIdChange={handleUserIdChange}
        userId={userId}
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
          totalPosts={data.length}
          handlePageNumberClick={handlePageNumberClick}
          currentPage={currentPage}
          postPerPage={postPerPage}
        />
      </div>
    </div>
  );
};

export default Home;
