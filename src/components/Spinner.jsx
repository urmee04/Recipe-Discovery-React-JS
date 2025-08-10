import { CircularProgress, Box } from "@mui/material";

/**
 * Loading spinner component
 */
const Spinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
