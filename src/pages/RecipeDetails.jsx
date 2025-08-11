// Import necessary hooks from React and react-router-dom
import { useParams } from "react-router-dom"; //hook to access URL parameters like the recipe ID
import useFetch from "../hooks/useFetch"; //custom hook to handle fetching data
import { useFavorites } from "../context/FavoritesContext"; //custom hook to access the favorites state and functions

// Import components from Material-UI for styling
import {
  Typography, // For rendering text with semantic meaning (like headers, paragraphs)
  Box, //A generic container component for layout and spacing
  Button, //for interactive buttons
  List, //for creating lists
  ListItem, //individual item within a List
  ListItemText, //The text content inside a ListItem
  Divider, // a thin line to separate content
  Chip, //a compact element for displaying labels or tags
  Alert, // A component for displaying important messages like errors or info
} from "@mui/material";

// Import custom components for specific UI states
import Spinner from "../components/Spinner"; // Displays a loading indicator
import ErrorMessage from "../components/ErrorMessage"; // Displays an error message

// Define the RecipeDetails component
const RecipeDetails = () => {
  // Get the 'id' from the current URL
  const { id } = useParams();

  // Use the custom fetch hook to get recipe data from TheMealDB API
  // It returns the data, loading state, and any error that occurred.
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  // Use the custom favorites hook to get the functions needed to manage favorites
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // If data is still being fetched, show the Spinner component
  if (loading) return <Spinner />;
  // If an error occurred during the fetch, show the ErrorMessage component
  if (error) return <ErrorMessage message={error} />;

  // Safely access the first meal from the API response. The API returns { meals: [...] }.
  const meal = data?.meals?.[0];
  // If the fetch was successful but no meal was found for the given ID, show an info alert.
  if (!meal) return <Alert severity="info">Recipe not found</Alert>;

  /**
   * Helper function to parse and combine ingredients and their measurements.
   * TheMealDB API stores ingredients in separate fields (strIngredient1, strMeasure1, etc.).
   * This function loops through them and creates a clean array of objects.
   * returns an array of objects, e.g., [{ ingredient: 'Beef', measure: '900 gram' }]
   */
  const getIngredients = () => {
    const ingredients = [];
    // The API has up to 20 ingredient fields
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      //Only add the item to the list if an ingredient name exists and isn't just empty space
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  // This function is called when the "Add/Remove from Favorites" button is clicked
  const handleFavoriteClick = () => {
    // Check if the current meal is already in favorites
    if (isFavorite(meal.idMeal)) {
      // If it is in favorites call the removeFavorite function from the context
      removeFavorite(meal.idMeal);
    } else {
      // If it's not, call the addFavorite function passing the entire meal object
      addFavorite(meal);
    }
  };

  // The JSX that renders the component's UI
  return (
    <Box sx={{ padding: 4 }}>
      {/* Recipe Title */}
      <Typography variant="h3" gutterBottom>
        {meal.strMeal}
      </Typography>

      {/* Main content container with a flex layout */}
      <Box
        sx={{
          display: "flex",
          gap: 4, //sets space between child elements
          // The layout is a column on small screens (xs) and a row on medium screens (md) and up
          flexDirection: { xs: "column", md: "row" },
          mb: 4, //Margin-bottom for spacing below this box
        }}
      >
        {/* Left Column Recipe Image and Favorite Button */}
        <Box sx={{ flex: 1 }}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            style={{
              width: "100%", //make the image responsive
              borderRadius: 8, //give it slightly rounded corners
              boxShadow: 3, //add a subtle shadow for depth
            }}
          />

          {/* Favorite Button */}
          <Button
            variant="contained"
            //The button's color changes based on whether the recipe is a favorite
            color={isFavorite(meal.idMeal) ? "secondary" : "primary"}
            onClick={handleFavoriteClick}
            sx={{ mt: 2, width: "100%" }} //margin-top and full width
            size="large"
          >
            {/* The button's text also changes based on the favorite status */}
            {isFavorite(meal.idMeal)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </Button>
        </Box>

        {/* Right Colum, Recipe Details */}
        <Box sx={{ flex: 1 }}>
          {/* Category and Area tags */}
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {meal.strCategory && (
              <Chip label={meal.strCategory} color="primary" />
            )}
            {meal.strArea && <Chip label={meal.strArea} color="secondary" />}
          </Box>
          {/* Ingredients List */}
          <Typography variant="h5" gutterBottom>
            Ingredients
          </Typography>
          <List dense>
            {" "}
            {/* `dense` reduces the padding for a more compact list */}
            {/* Map over the ingredients array and create a ListItem for each one */}
            {getIngredients().map((item, index) => (
              //using the index as a key here is okay because the list is static and won't be re-ordered
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.ingredient}`} //The main text
                  secondary={item.measure} //The secondary, smaller text
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 3 }} />{" "}
          {/* A separator line with vertical margin */}
          {/* Instructions */}
          <Typography variant="h5" gutterBottom>
            Instructions
          </Typography>
          {/* The instructions text, rendered as a paragraph */}
          <Typography gutterBottom>{meal.strInstructions}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeDetails;
