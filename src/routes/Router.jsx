import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import AboutPage from "../pages/AboutPage";
import MyCardsPage from "../pages/MyCardsPage";
import CreateCardPage from "../pages/CreateCardPage";
import CRMpage from "../pages/CRMpage";
import AdoptionPage from "../pages/AdoptionPage";
import BreedPage from "../pages/BreedPage";
import ChatPage from "../pages/ChatPage";
import DonationPage from "../pages/DonationPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path="/breed/:breed" element={<BreedPage />} />
      <Route path="/chats/:tokenId/:userId" element={<ChatPage />} />
      <Route path={ROUTES.ADOPTION} element={<AdoptionPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.DONATION} element={<DonationPage />} />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<MyCardsPage />}
          />
        }
      />

      <Route
        path={ROUTES.CRM}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<CRMpage />}
          />
        }
      ></Route>
      <Route path={ROUTES.CREATE} element={<CreateCardPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPage />} />}
      />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path={ROUTES.CREATE}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<CreateCardPage />}
          />
        }
      />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
