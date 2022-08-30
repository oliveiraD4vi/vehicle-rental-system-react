import { lazy, Suspense } from "react";
import {
  Route,
  Routes as RouteWrapper,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

const Layout = lazy(() => import('./screens/Layout/layout'));
const Home = lazy(() => import('./screens/public/Home/home'));
const Login = lazy(() => import('./screens/public/Login/login'));
const Cars = lazy(() => import('./screens/public/Cars/cars'));
const Register = lazy(() => import('./screens/public/Register/register'));
const About = lazy(() => import('./screens/public/About/about'));

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

          <Route path="*" element={<Navigate to="/" />} />
        </RouteWrapper>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
