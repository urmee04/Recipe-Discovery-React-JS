import useFetch from "../hooks/useFetch";
import { Grid, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  // Fetch categories using our custom hook
  const { data, loading, error } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  // Show spinner while loading data
  if (loading) return <Spinner />;

  // Show error message if fetch failed
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ padding: "20px" }}>
      {/* Page title */}
      <Typography variant="h3" gutterBottom>
        Recipe Categories
      </Typography>

      {/* Subtitle below the title */}
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
        Browse recipes by category
      </Typography>

      {/* Responsive grid container for category cards */}
      <Grid container spacing={4}>
        {data?.categories?.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.idCategory}>
            {/* RecipeCard component shows category info */}
            <RecipeCard
              recipe={{
                strMeal: category.strCategory,
                strMealThumb: category.strCategoryThumb,
                // Truncate description to 100 chars and then includes ellipsis
                strCategory:
                  category.strCategoryDescription.substring(0, 100) + "...",
              }}
              to={`/category/${category.strCategory}`}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
