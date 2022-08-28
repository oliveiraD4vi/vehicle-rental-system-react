import { lazy, Suspense } from "react";
import {
  Route,
  Routes as RouteWrapper,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

const Layout = lazy(() => import('../screens/Layout/layout'));

const Routes = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <RouteWrapper>
          <Route
            path="/"
            element={
              <Layout>
                <span>test</span>
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
