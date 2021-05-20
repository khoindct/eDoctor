import { Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import CustomerPage from "./pages/CustomerPage";
import MapPage from "./pages/MapPage";
import CalendarPage from "./pages/CalendarPage";
import CustomerEditPage from "./pages/CustomerEditPage";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationEditPage from "./pages/ApplicationEditPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage";
import LandingPage from "./pages/LandingPage";
import BookingAndReviewPage from "./pages/BookingAndReviewPage";
import SearchClinicPage from "./pages/SearchClinicPage";
import SignupPage from "./pages/auth/SignupPage";
import RegisterClinicPage from "./pages/RegisterClinicPage";
import DashboardPatientPage from "./pages/DashboardPatientPage";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "applications", element: <ApplicationPage /> },
      { path: "applications/:id/detail", element: <ApplicationDetailPage /> },
      { path: "applications/:id/edit", element: <ApplicationEditPage /> },
      { path: "customers", element: <CustomerPage /> },
      { path: "customers/:id/edit", element: <CustomerEditPage /> },
      { path: "map", element: <MapPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "book-clinic", element: <BookingAndReviewPage /> },
      { path: "search-clinic", element: <SearchClinicPage /> },
      { path: "register-clinic", element: <RegisterClinicPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "profile/:id", element: <DashboardPatientPage /> },
      { path: "404", element: <NotFoundPage /> },
    ],
  },
];

export default routes;
