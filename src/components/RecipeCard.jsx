import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

//reusable component to display a preview of a recipe as a clickable card
const RecipeCard = ({ recipe, to }) => {
  return (
    <Card
      //MUI Card component styled with sx prop for custom styles
      sx={{
        height: "100%", // make card fill available vertical space
        display: "flex", // use flexbox for layout
        flexDirection: "column", // arrange children vertically
        transition: "transform 0.3s", //smooth transition for hover effect
        "&:hover": {
          transform: "scale(1.03)", //slight zoom on hover for visual feedback
          boxShadow: 3, // Raise shadow level on hover to emphasize card
        },
      }}
    >
      {/* React Router Link wraps the card content to make entire card clickable */}
      <Link to={to} style={{ textDecoration: "none" }}>
        {/* CardMedia renders the recipe image */}
        <CardMedia
          component="img" // Render an <img> element
          image={recipe.strMealThumb || "/placeholder.jpg"} // Use recipe image or fallback placeholder
          alt={recipe.strMeal} // Alt text for accessibility
          sx={{ height: 200, objectFit: "cover" }} // Fixed height, crop image to cover area
        />
        {/* CardContent contains text content like title and category */}
        <CardContent>
          {/* Recipe name displayed as heading */}
          <Typography
            gutterBottom // Adds margin below text
            variant="h5" // Sets font size and weight consistent with heading 5
            component="div" // Renders as a div element
            color="text.primary" // Uses primary text color from theme
          >
            {recipe.strMeal}
          </Typography>
          {/* Conditionally show recipe category if available */}
          {recipe.strCategory && (
            <Typography variant="body2" color="text.secondary">
              {recipe.strCategory}
            </Typography>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default RecipeCard;
