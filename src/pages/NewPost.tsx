import React, { useState } from 'react';
import { getRandomArbitrary } from '../utils/getRandomArbitrary';
import { PostProps } from './Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input onChange={handleChange} type='text' name='title' required />
        </label>
        <label>
          Body:
          <textarea onChange={handleChange} name='body' required />
        </label>

        <input type='submit' value={`${loading ? 'Adding...' : 'Add'}`} />
      </form>
    </>
  );
};

export default NewPost;
