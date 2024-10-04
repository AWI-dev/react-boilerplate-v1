import { Suspense, useEffect } from "react";
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
import { useAuthHeaders } from "./lib/utils/getHeaders";
import usePageHandler from "./hooks/usePageHandler";
import { useAccessTokenState } from "./lib/StateManager/storeState";
function App() {
  const { getHeaders } = useAuthHeaders();

  const { setAccessToken } = useAccessTokenState();

  usePageHandler(() => {
    console.log("Page is about to be refreshed!");
    // Perform any action you want before page refresh
    setAccessToken("sample token");
  });

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
