import { Alert } from "@mui/material";

//Error message component

const ErrorMessage = ({ message }) => {
  return (
    <Alert severity="error" sx={{ margin: 2 }}>
      {message || "Error. Please try again later."}
    </Alert>
  );
};

export default ErrorMessage;
