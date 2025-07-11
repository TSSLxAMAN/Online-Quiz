import './App.css'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';

function App() {
  const route = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: (
              <Home />
            )
          },
          {
            path: "login",
            element: (
              <Login />
            )
          },
          {
            path: "dashboard",
            element: (
              <RequireAuth>
                <Dashboard/>
              </RequireAuth>
            )
          },
        ]
      }
    ]
  );

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
