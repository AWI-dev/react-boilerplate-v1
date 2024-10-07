import { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import routes from "./routes";
import MainLayout from "./components/layout/MainLayout";
import Auth from "./pages/Auth/Auth";
import PageNotFound from "./pages/Common/PageNotFound";
import AuthProvider from "./Provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer bodyClassName="font-body text-xs" />
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
                    <AuthProvider>
                      <Component />
                    </AuthProvider>
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
