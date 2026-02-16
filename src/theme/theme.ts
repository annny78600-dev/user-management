import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6a11cb",
    },
    secondary: {
      main: "#2575fc",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
          color: "#fff",
          fontWeight: 600,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          "&:hover": {
            background: "linear-gradient(45deg, #2575fc 30%, #6a11cb 90%)",
          },
        },
        outlined: {
          border: "2px solid",
          color: "#6a11cb",
          fontWeight: 600,
          "&:hover": {
          },
        },

        text: {
          "&:hover": {
            backgroundColor: "rgba(106,17,203,0.1)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
          color: "#fff",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&.Mui-focused fieldset": {
              borderColor: "#6a11cb",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#6a11cb",
          },
        },
      },
    },


  },
});

export default theme;
