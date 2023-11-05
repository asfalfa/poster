import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from './pages/root';
import Error from './pages/error';
import Home from './pages/home';
import Project from './pages/project';
import Media from './pages/media';
import Login from './pages/login';
import Create from './pages/create';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:project/:branch',
        element: <Project />,
      },
      {
        path: '/:project/:branch/:post/',
        element: <Media />,
      },
      {
        path: '/:project/settings',
        element: <Project />,
      },
      {
        path: '/project',
        element: <Create />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
