import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import "./App.css";
import MuiNavbar from "./components/Navbar/MuiNavbar";
import FooterComponent from "./components/FooterComponent";
import Router from "./routes/Router";
import { useSelector } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";
import useAdmin from "./hooks/useAdmin";
import useBiz from "./hooks/useBiz";
import axios from "axios";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [biz, setBiz] = useState(null);
  const [admin, setAdmin] = useState(null);
  const loggedIn = useLoggedIn();
  const isAdmin = useAdmin();
  const isBiz = useBiz();

  useEffect(() => {
    setAdmin(isAdmin());
    setBiz(isBiz());
    loggedIn();
  }, []);

  //checking if token is valid, if not it deletes it. in case of old token that might be saved
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        jwtDecode(token);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        return;
      }

      axios
        .get("/validate-token", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.valid === false) {
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container maxWidth={false} disableGutters id="mainContainer">
        <header>
          <MuiNavbar />
          {/* <Sidebar /> */}
        </header>
        <main>
          <Router />
          {/* <Navbar /> */}
        </main>
        <footer>
          <FooterComponent />
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
