import style from "./styles/App.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "./context/Context";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Board from "./pages/Board";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Board />,
      },
      {
        path: "/single/:id",
        element: <Single />,
      },
      {
        path: "/write/:id",
        element: <Write />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/userprofile/:id",
        element: <UserProfile />,
      },
    ],
  },
]);

function App() {
  return (
    <div className={style.App}>
      <div className={style.container}>
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </div>
    </div>
  );
}

export default App;
