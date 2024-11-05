import axios from 'axios';
import { useEffect, useState } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        setData(response.data);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
}

export default useFetch;
