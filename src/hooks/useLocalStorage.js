import { useState, useEffect } from "react";

// Custom hook to store and retrieve state directly from localStorage
// This makes state persistent even after a page refresh
const useLocalStorage = (key, initialValue) => {
  //initialize state with the value from localStorage, if it exists
  //otherwise fall back to the provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      //If something goes wrong like it is a invalid JSON then just use the initial value
      console.error(error);
      return initialValue;
    }
  });

  //custom setter function that updates both state and localStorage
  const setValue = (value) => {
    try {
      // Support functional updates just like React’s setState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      //Update React state
      setStoredValue(valueToStore);
      //Save the updated value to localStorage as a JSON string
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  //Keep state in sync across multiple browser tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      // if the same key changes in another tab, update this state too
      if (e.key === key && e.newValue !== JSON.stringify(storedValue)) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, storedValue]);

  //Return the stored value and the custom setter function
  return [storedValue, setValue];
};

export default useLocalStorage;
