import { Grid, Typography, Button, Box } from "@mui/material";
import { useFavorites } from "../context/FavoritesContext";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

/**
 * The Favorites component displays a list of recipes that the user has marked as favorite
 */
const Favorites = () => {
  // Use the custom context hook to get the current list of 'favorites' and the 'removeFavorite' function
  const { favorites, removeFavorite } = useFavorites();

  // The main JSX to be rendered by the component
  return (
    // A root div with some padding for the entire page
    <div style={{ padding: "20px" }}>
      {/* Page title */}
      <Typography variant="h3" gutterBottom>
        Your Favorite Recipes
      </Typography>

      {/*  Conditional Rendering */}
      {/* Check if the favorites array is empty. */}
      {/* If it is, display a message. Otherwise, display the list of favorite recipes. */}
      {favorites.length === 0 ? (
        //This block renders when there are no favorites
        <Box textAlign="center" sx={{ mt: 4 }}>
          {" "}
          {/* `Box` is used for layout and centering */}
          <Typography variant="h5" gutterBottom>
            You haven't added any favorites yet.
          </Typography>
          <Button
            // This tells the MUI Button to render as a React Router 'Link' component
            component={Link}
            // This is the destination path for the link
            to="/"
            variant="contained"
            color="primary"
            size="large"
          >
            Browse Recipes
          </Button>
        </Box>
      ) : (
        // This block renders when there are favorites
        // 'Grid container' sets up the responsive grid layout
        <Grid container spacing={4}>
          {/* Map over the 'favorites' array to render a card for each recipe */}
          {favorites.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
              {/* The RecipeCard component displays the recipe's image and name */}
              <RecipeCard
                recipe={recipe} // Pass the full recipe object to the card
                //create a link to the detailed view for this specific recipe
                to={`/recipe/${recipe.idMeal}`}
              />
              {/* Button to remove the recipe from favorites */}
              <Button
                variant="contained"
                color="secondary"
                // The onClick handler calls the 'removeFavorite' function from the context
                // An arrow function is used here to ensure 'removeFavorite' is called with the correct ID only when the button is clicked
                onClick={() => removeFavorite(recipe.idMeal)}
                sx={{ mt: 1, width: "100%" }}
              >
                Remove from Favorites
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Favorites;
