### SBA 10: Recipe Discovery App

This project demonstrates a comprehensive understanding of modern React development through a fully-featured single-page application (SPA). I've designed a seamless user experience where visitors can:

- Browse recipes by category
- Save favorites with persistent local storage
- Search dynamically across thousands of recipes
- View detailed instructions with ingredient lists

---

#### Technologies Used
- React: JavaScript library for building user interfaces.
- React Router: Library for handling navigation in a React application.
- The Meal Database API: Provides recipe data for the app.
- Material UI

--- 

#### Cloning the Repository

1. To clone this repository, open terminal or command prompt and run the following command:

```bash
git clone https://github.com/urmee04/Recipe-Discovery-React-JS.git
cd recipe-discovery
npm install
npm run dev
```

2. Install core MUI with the following commands

```bash
npm install @mui/material @emotion/react @emotion/styled`
npm install @mui/icons-material
```

#### Reflection

- **The most challenging part of the project**

The most challenging part was to implement a real-time favorites system that required:

- Instant UI updates across multiple components (cards, details page, favorites list)

- Persistent storage that stays page refreshes

- Synchronized state management without prop drilling

I solved this by creating a centralized state manager using React Context API, integrated with localStorage for persistence.

- **A brief explanation of a design decision**

I combined two patterns to manage state effectively:
useFetch Hook: Handles data fetching, errors, and loading states.
Context API: Manages global state (e.g., user favorites) and syncs with localStorage.
This design helped me to maintain the following features:
- `Separation of Concerns`: useFetch retrieves data, Context shares it globally.
- `Performance Optimization`: Prevents unnecessary re-renders and memory leaks.
This approach results in cleaner components, easier global state management, and a better user experience.

#### References

To complete the Recipe Discovery App, I referenced code from our class lessons and materials, as well as reviewed code from previous labs and projects. Additionally, I used the resources mentioned below to better understand the concepts and code flow.

- [The MealDB API Docs](https://www.themealdb.com/api.php)
- [Search Bar](https://builtin.com/articles/react-search-bar)
- [React Hook Documentation](https://react.dev/reference/react)
- [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- [Context API Tutorial](https://www.youtube.com/watch?v=oc3VM6Mqqx0)
- [Material UI](https://mui.com/material-ui/getting-started/)
- [MDN LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)





