import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Switch } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponent";
import "./navbar_css/MuiNavbar.css";
import { authActions } from "../../store/auth";
import Sidebar from "./Sidebar";
import PetsIcon from "@mui/icons-material/Pets";

// access to all
const pages = [
  {
    label: "About us",
    url: ROUTES.ABOUT,
  },
  {
    label: "Adoption",
    url: ROUTES.ADOPTION,
  },
];

//not logged in users
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

//logged in users
const authedPages = [
  {
    label: "Donation and charity",
    url: ROUTES.DONATION,
  },
  {
    label: <AccountCircleIcon />,
    url: ROUTES.PROFILE,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];

//admin/biz pages
const adminPages = [
  {
    label: "CRM",
    url: ROUTES.CRM,
  },
];
const bizPages = [
  {
    label: "My Dogs",
    url: ROUTES.MYCARDS,
  },
];

const MuiNavbar = () => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const isAdmin = useSelector((bigState) => bigState.authSlice.isAdmin);
  const isBiz = useSelector((bigState) => bigState.authSlice.isBiz);

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  const handleHomeIconClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <AppBar position="static" sx={{ width: "100%", m: "0" }} id="NavBGcolor">
      <Container maxWidth="false">
        <Toolbar>
          {isLoggedIn && <Sidebar />}
          <IconButton onClick={handleHomeIconClick}>
            <PetsIcon sx={{ fontSize: "4rem" }} />

            <Typography
              variant="h6"
              noWrap
              sx={{ display: { xs: "none", md: "inline" } }}
            >
              DogHome
            </Typography>
          </IconButton>

          {/* main navbar */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isBiz
              ? bizPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {isAdmin
              ? adminPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex", lg: "flex" } }}>
            {" "}
            <SearchPartial sx={{ mt: { lg: 3 } }} />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex", lg: "flex" } }}>
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={logoutClick}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}
          </Box>

          <Box sx={{ my: 2, p: 1 }}>
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? (
                <DarkModeIcon
                  sx={{
                    fontSize: "2rem",
                    mt: 1,
                  }}
                />
              ) : (
                <LightModeIcon
                  sx={{
                    fontSize: "2rem",
                    mt: 1,
                  }}
                />
              )}
            </Typography>
          </Box>
          <Switch checked={isDarkTheme} onChange={changeTheme} />
          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={"miniLinks" + page.url}
                  component={NavLink}
                  to={page.url}
                  onClick={handleCloseNavMenu}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "inherit",
                    }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
              {isBiz &&
                bizPages.map((page) => (
                  <MenuItem
                    key={"miniLinks" + page.url}
                    component={NavLink}
                    to={page.url}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "inherit",
                      }}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              {isAdmin &&
                adminPages.map((page) => (
                  <MenuItem
                    key={"miniLinks" + page.url}
                    component={NavLink}
                    to={page.url}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "inherit",
                      }}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              {isLoggedIn
                ? authedPages.map((page) =>
                    page.url === ROUTES.LOGOUT ? (
                      <MenuItem
                        key={"miniLinks" + page.url}
                        component={NavLink}
                        to={page.url}
                        onClick={logoutClick}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            color: "inherit",
                          }}
                        >
                          {page.label}
                        </Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key={"miniLinks" + page.url}
                        component={NavLink}
                        to={page.url}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            color: "inherit",
                          }}
                        >
                          {page.label}
                        </Typography>
                      </MenuItem>
                    )
                  )
                : notAuthPages.map((page) => (
                    <MenuItem
                      key={"miniLinks" + page.url}
                      component={NavLink}
                      to={page.url}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: "inherit",
                        }}
                      >
                        {page.label}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
