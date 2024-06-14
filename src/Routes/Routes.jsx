import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Components/Home/Home";
import SignUp from "../Components/Payges/SignUp/SignUp";
import Login from "../Components/Payges/Login/Login";
import Dashboard from "../Layout/Dashboard";
import PrivetRoute from "./PrivetRoute";
import AllTasks from "../Components/Dashboard/AllTasks/AllTasks";
import AddTask from "../Components/Dashboard/AddTask/AddTask";
import CompletedTask from "../Components/Dashboard/CompletedTask/CompletedTask";
import InCompletedTask from "../Components/Dashboard/InCompletedTask/InCompletedTask";

export const Routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <></>,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <></>,
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        path: "/dashboard/allTasks",
        element: <AllTasks />,
      },
      {
        path: "/dashboard/addTask",
        element: <AddTask />,
      },
      {
        path: "/dashboard/completedTask",
        element: <CompletedTask/>
      },
      {
        path: "/dashboard/inCompletedTask",
        element: <InCompletedTask/>
      }
    ],
  },
]);
