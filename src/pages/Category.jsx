import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Grid, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const Category = () => {
  //get category name from the URL parameters (e.g., /category/Beef -> categoryName = "Beef")
  const { categoryName } = useParams();

  //fetch recipes that belong to the given category
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  //show a loading spinner while the fetch request is in progress
  if (loading) return <Spinner />;

  //show an error message if the fetch request fails
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ padding: "20px" }}>
      {/* Page title showing which category we are viewing */}
      <Typography variant="h3" gutterBottom>
        {categoryName} Recipes
      </Typography>

      {/* If recipes are found, render them in a responsive grid */}
      {data?.meals ? (
        <Grid container spacing={4}>
          {data.meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              {/* RecipeCard for each meal; clicking navigates to its details page */}
              <RecipeCard recipe={meal} to={`/recipe/${meal.idMeal}`} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // If no recipes are available, show a fallback message
        <Typography variant="h5">No recipes found for this category</Typography>
      )}
    </div>
  );
};

export default Category;
