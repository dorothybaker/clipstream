import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Video from "./pages/Video";
import Auth from "./pages/Auth";
import Subscriptions from "./pages/Subscriptions";
import Trending from "./pages/Trending";
import { useQuery } from "@tanstack/react-query";
import { API } from "./utils/makeRequest";
import Newvideo from "./pages/Newvideo";
import Search from "./pages/Search";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await API.get("/users/me");
        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/explore", element: <Trending /> },
        {
          path: "/subscriptions",
          element: user ? <Subscriptions /> : <Navigate to="/" />,
        },
        { path: "/newvideo", element: <Newvideo /> },
        { path: "/search", element: <Search /> },
        { path: "/videos/:id", element: <Video /> },
        { path: "/auth", element: user ? <Navigate to="/" /> : <Auth /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
