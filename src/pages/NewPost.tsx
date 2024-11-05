import React, { useState } from 'react';
import { getRandomArbitrary } from '../utils/getRandomArbitrary';
import { PostProps } from './Home';
import axios from 'axios';
import styles from '../styles/NewPost.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const initialFormData: PostProps = {
  title: '',
  body: '',
  userId: 1,
  id: getRandomArbitrary(0, 10),
};

const NewPost: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        formData
      );
      console.log('🚀 ~ handleSubmit ~ response:', response);

      setFormData(initialFormData);
      navigate('/');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>New post</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formItemLable}>
            Title:
            <input
              className={styles.formItemInput}
              onChange={handleChange}
              type='text'
              name='title'
              required
            />
          </label>
          <label className={styles.formItemLable}>
            Body:
            <textarea
              className={styles.formItemInput}
              onChange={handleChange}
              name='body'
              required
            />
          </label>

          <input
            className={styles.formButton}
            type='submit'
            value={`${loading ? 'Adding...' : 'Add'}`}
          />
        </form>
      </div>
    </>
  );
};

export default NewPost;
