//import Link for navigation, and useNavigate for programmatic navigation
import { Link, useNavigate } from "react-router-dom";

//import Material UI components for the app bar, toolbar, text, layout box, text field, icons.
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

//import the search icon from Material UI's icon library
import SearchIcon from "@mui/icons-material/Search";

//import useState to store the search term
import { useState } from "react";

function Navbar() {
  //state to keep track of the search input's current value
  const [searchTerm, setSearchTerm] = useState("");

  //Hook to navigate to different routes programmatically
  const navigate = useNavigate();

  //Function that runs when the search icon is clicked or Enter is pressed
  const handleSearch = () => {
    //Only navigate if there is a non-empty search term
    if (searchTerm.trim()) {
      //Navigate to /search with the search term as a query parameter
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    //AppBar is Material UI's component for a top navigation bar
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      {/* Toolbar arranges items horizontally inside the AppBar */}
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* position left side navigation links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Each Typography is styled as a Link to different pages */}
          <Typography
            component={Link} // Renders as a React Router Link
            to="/" // Navigates to Home page
            sx={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }} //Styling
          >
            Home
          </Typography>

          <Typography
            component={Link} //Link to Category page
            to="/category"
            sx={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
          >
            Category
          </Typography>

          <Typography
            component={Link} // Link to Recipe Details page
            to="/recipedetails"
            sx={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
          >
            Recipe
          </Typography>
        </Box>

        {/* Position Right side Search Field */}
        <TextField
          size="small" //Makes the field smaller
          variant="outlined" //Outlined border style
          placeholder="Search recipes..." // Placeholder text
          value={searchTerm} // Controlled component bound to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Updates state on typing
          slotProps={{
            input: {
              sx: { backgroundColor: "#fff", borderRadius: 1 },

              // Icon button inside the input field
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon /> {/* Magnifying glass icon */}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          // Allow search when pressing Enter key
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
