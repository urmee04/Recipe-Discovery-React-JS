import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <Router>
      {/* Wrap app with FavoritesProvider for global state */}
      <FavoritesProvider>
        {/* Navigation bar */}
        <Navbar />

        {/* Main content with routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
