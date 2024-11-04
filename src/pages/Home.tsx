import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface PostInterface {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const TEST_URL = 'https://jsonplaceholder.typicode.com';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);

        // api request
        const response = await axios.get(`${TEST_URL}posts`);

        const data = response.data;
        setPosts(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      <h2 className=''>Post list</h2>
      <div className='flexbox-container wrap'>
        {loading
          ? 'Loading...'
          : posts.map((post: PostInterface) => (
              <div className='post-card' key={post.id}>
                <h4 className='card-title'>{post.title}</h4>
                <p className='card-desc'>{post.body.substring(0, 50)}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
