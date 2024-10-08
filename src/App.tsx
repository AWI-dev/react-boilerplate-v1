import { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import routes from "./routes";
import MainLayout from "./components/layout/MainLayout";
import Auth from "./pages/Auth/Auth";
import PageNotFound from "./pages/Common/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense
                    fallback={
                      <>
                        <p>loading...</p>
                      </>
                    }
                  >
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
