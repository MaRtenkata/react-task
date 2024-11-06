import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { v4 as uuid } from 'uuid';
import styles from '../styles/CreatNewPostPage.module.css';
// import { useNavigate } from 'react-router-dom';
import { PostProps } from '../components/Post';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { API_URL } from '../config';

const initialFormData: PostProps = {
  title: '',
  body: '',
  userId: 1,
  id: Number(uuid()),
};

const initialFormError: { title: string; body: string } = {
  title: '',
  body: '',
};

const CreateNewPostPage: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <h2>New post</h2>
        <ToastContainer />
        <CreatNewPostForm />
      </div>
    </>
  );
};

const CreatNewPostForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(initialFormError);
  // const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = addPostValidator({
      title: formData.title,
      body: formData.body,
    });

    if (errors.title || errors.body) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        await axios.post(`${API_URL}/posts`, formData);
        toast.success('Post created successfully!');
        setFormData(initialFormData);
        // navigate('/');
      } catch (error) {
        toast.error('Error !' + error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formItemLable}>
          Title:
          <input
            className={styles.formItemInput}
            onChange={handleChange}
            type='text'
            name='title'
          />
        </label>
        {formError.title && <p className={styles.error}>{formError.title}</p>}
        <label className={styles.formItemLable}>
          Body:
          <textarea
            className={styles.formItemInput}
            onChange={handleChange}
            name='body'
          />
        </label>
        {formError.body && <p className={styles.error}>{formError.body}</p>}
        <input
          className={styles.formButton}
          type='submit'
          value={`${loading ? 'Adding...' : 'Add'}`}
        />
      </form>
    </div>
  );
};

const addPostValidator = ({ title, body }: { title: string; body: string }) => {
  const errors = {
    title: '',
    body: '',
  };

  if (!title) {
    errors.title = 'Title is required';
  }

  if (!body) {
    errors.body = 'Body is required';
  }

  return errors;
};

export default CreateNewPostPage;
