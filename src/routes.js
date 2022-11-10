import { lazy, Suspense } from "react";
import {
  Route,
  Routes as RouteWrapper,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

const Layout = lazy(() => import("./screens/Layout/layout"));
const Home = lazy(() => import("./screens/public/Home/home"));
const Login = lazy(() => import("./screens/public/Login/login"));
const Cars = lazy(() => import("./screens/public/Cars/cars"));
const Register = lazy(() => import("./screens/public/Register/register"));
const About = lazy(() => import("./screens/public/About/about"));
const Reservations = lazy(() =>
  import("./screens/private/User/Reservation/reservation")
);
const AdminHome = lazy(() => import("./screens/private/Admin/Home/home"));
const AdminReservation = lazy(() =>
  import("./screens/private/Admin/Reservation/reservation")
);
const AdminReservationData = lazy(() =>
  import("./screens/private/Admin/Reservation/Data/data")
);
const AdminVehicle = lazy(() =>
  import("./screens/private/Admin/Vehicle/vehicle")
);
const AdminVehicleData = lazy(() =>
  import("./screens/private/Admin/Vehicle/Data/data")
);
const AdminUser = lazy(() => import("./screens/private/Admin/User/user"));
const AdminUserData = lazy(() =>
  import("./screens/private/Admin/User/Data/data")
);

const Routes = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <RouteWrapper>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/cars"
            element={
              <Layout>
                <Cars />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/reservations"
            element={
              <Layout>
                <Reservations />
              </Layout>
            }
          />
          <Route
            path="/admin/home"
            element={
              <Layout>
                <AdminHome />
              </Layout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Layout>
                <AdminUser />
              </Layout>
            }
          />
          <Route
            path="/admin/users/data"
            element={
              <Layout>
                <AdminUserData />
              </Layout>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <Layout>
                <AdminReservation />
              </Layout>
            }
          />
          <Route
            path="/admin/reservations/data"
            element={
              <Layout>
                <AdminReservationData />
              </Layout>
            }
          />
          <Route
            path="/admin/vehicles"
            element={
              <Layout>
                <AdminVehicle />
              </Layout>
            }
          />
          <Route
            path="/admin/vehicles/data"
            element={
              <Layout>
                <AdminVehicleData />
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </RouteWrapper>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
