import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create the FavoritesContext with default values
// These default values act as a placeholder when no Provider wraps the component
const FavoritesContext = createContext({
  favorites: [], //stores the list of favorite recipes
  addFavorite: () => {}, //function to add a recipe to favorites
  removeFavorite: () => {}, //function to remove a recipe from favorites
  isFavorite: () => false, //function to check if a recipe is already added as favorite
});

/**
 * FavoritesProvider component wraps the app and provides favorites-related
 * state and functions to all children via React Context.
 */
export function FavoritesProvider({ children }) {
  // Use our custom hook to sync favorites with localStorage so they persist across page reloads.
  //"favoriteRecipes" is the key in localStorage; [] is the default empty array.
  const [favorites, setFavorites] = useLocalStorage("favoriteRecipes", []);

  //Add a recipe to favorites if it isn't already in the list

  const addFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      //avoid duplicates by checking if this recipe already exists in favorites
      if (!prevFavorites.some((fav) => fav.idMeal === recipe.idMeal)) {
        return [...prevFavorites, recipe]; //append new recipe to the array.
      }
      return prevFavorites; //no change if it's already a favorite.
    });
  };

  //Remove a recipe from favorites by its ID.

  const removeFavorite = (id) => {
    setFavorites(
      // Keep only recipes whose IDs don't match the target ID
      (prevFavorites) => prevFavorites.filter((recipe) => recipe.idMeal !== id)
    );
  };

  //Check if a recipe is already in favorites.
  //True if the recipe is in favorites, false otherwise.

  const isFavorite = (id) => {
    return favorites.some((recipe) => recipe.idMeal === id);
  };

  // Provide the favorites data and handler functions to all child components via context
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Custom hook to easily access the FavoritesContext in any component.
 * returns object Contains favorites array and related functions.
 */
export function useFavorites() {
  return useContext(FavoritesContext);
}
