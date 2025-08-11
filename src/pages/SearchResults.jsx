import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Grid, Typography } from "@mui/material";
// Import reusable components for displaying a recipe, a loading spinner, and an error message
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

/**
 * The SearchResults component fetches and displays recipes based on a search query
 * from the URL (e.g. /search?query=chicken)
 */
const SearchResults = () => {
  //useSearchParams is a hook that returns an array; the first element contains the URL search parameters
  const [searchParams] = useSearchParams();
  //get the value of the 'query' parameter from the URL
  const query = searchParams.get("query");
  // Use the custom fetch hook to get data from TheMealDB API
  // The fetch is only triggered if a 'query' exists. If 'query' is null or undefined,
  // the hook receives `null` and should not initiate a fetch.
  const { data, loading, error } = useFetch(
    query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      : null
  );

  // UI State Handling
  //if the data is currently being fetched, display the Spinner component
  if (loading) return <Spinner />;
  //if an error occurred during the fetch, display the ErrorMessage component.
  if (error) return <ErrorMessage message={error} />;

  // The main JSX to be rendered by the component
  return (
    <div style={{ padding: "20px" }}>
      {/* Page title that dynamically includes the search query */}
      <Typography variant="h3" gutterBottom>
        Search Results for "{query}"
      </Typography>

      {/* Conditional Rendering of Results */}
      {/* Check if the API response contains a 'meals' array which means recipes were found */}
      {/* The optional chaining `data?.meals` prevents an error if `data` is null. */}
      {data?.meals ? (
        // If recipes were found, render them in a responsive grid.
        <Grid container spacing={4}>
          {/* Map over the array of meals returned from the API. */}
          {data.meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              {/* Render the reusable RecipeCard component for each meal. */}
              <RecipeCard
                recipe={meal} // Pass the full meal object as a prop
                to={`/recipe/${meal.idMeal}`} // Pass the link to the recipe's detail page
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        // If `data.meals` is null or undefined, it means no recipes were found for the query
        //display a message to the user informing them
        <Typography variant="h5">No recipes found for "{query}"</Typography>
      )}
    </div>
  );
};

export default SearchResults;
