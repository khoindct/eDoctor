import { Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PatientPage from "./pages/PatientPage";
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
import DoctorSettingPage from "./pages/DoctorSettingPage";
import DoctorRatingPage from "./pages/DoctorRatingPage";
import DoctorOpeningHoursPage from "./pages/DoctorOpeningHoursPage";
import DoctorSecurityPage from "./pages/DoctorSecurityPage";
import AdminClinicManagePage from "./pages/AdminClinicManagePage";
import AdminDoctorManagePage from "./pages/AdminDoctorManagePage";
import AdminPatientManagePage from "./pages/AdminPatientManagePage";

const routes = (authenticated: string, authorization: string) => [
  {
    path: "app",
    element: Boolean(authenticated) ? (
      authorization === "doctor" ? (
        <DashboardLayout />
      ) : (
        <NotFoundPage />
      )
    ) : (
      <Navigate to="/login" />
    ),
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "applications", element: <ApplicationPage /> },
      { path: "applications/:id/detail", element: <ApplicationDetailPage /> },
      { path: "applications/:id/edit", element: <ApplicationEditPage /> },
      { path: "patients", element: <PatientPage /> },
      { path: "ratings", element: <DoctorRatingPage /> },
      { path: "settings", element: <DoctorSettingPage /> },
      { path: "customers/:id/edit", element: <CustomerEditPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "opening-hours", element: <DoctorOpeningHoursPage /> },
      { path: "security", element: <DoctorSecurityPage /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "book-clinic/:id", element: <BookingAndReviewPage /> },
      { path: "search-clinic", element: <SearchClinicPage /> },
      { path: "register-clinic", element: <RegisterClinicPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "profile/:id", element: <DashboardPatientPage /> },
      { path: "404", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "admin",
    element: Boolean(authenticated) ? (
      authorization === "admin" ? (
        <DashboardLayout />
      ) : (
        <NotFoundPage />
      )
    ) : (
      <Navigate to="/login" />
    ),
    children: [
      { path: "clinics", element: <AdminClinicManagePage /> },
      { path: "doctors", element: <AdminDoctorManagePage /> },
      { path: "map", element: <MapPage /> },
      { path: "patients", element: <AdminPatientManagePage /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
