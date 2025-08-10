import { useState, useEffect } from "react";

//Custom hook for fetching data from an API
const useFetch = (url) => {
  //state to store the fetched result
  const [data, setData] = useState(null);
  //state to track loading status, initially true because fetch has not completed
  const [loading, setLoading] = useState(true);
  //state to store any errors that occur during fetching, initially set to null because no error yet
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //make the API request
        const response = await fetch(url);

        //check if response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        //Parse the JSON response
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-run effect when URL changes

  return { data, loading, error };
};

export default useFetch;
