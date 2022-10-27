import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/Admin/dashBoard/_index";
import ManagerUser from "../pages/Admin/managerAddUser/_index";
import ManagerQuestions from "../pages/Admin/managerQuestion/_index";
import QuestionAnswer from "../pages/Admin/questionAnswer/_index";
import Admin from "../pages/Admin/_index";
import HomePage from "../pages/Home/_index";
import Login from "../pages/Login/_index";
import SignUp from "../pages/SignUp/_index";
import QuestionQuiz from "../pages/User/Detail/_index";
import User from "../pages/User/_index";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="users" element={<User />} />
      </Route>
      <Route path="/quiz/:id" element={<QuestionQuiz />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<DashBoard />} />
        <Route path="manager-users" element={<ManagerUser />} />
        <Route path="manager-quiz" element={<ManagerQuestions />} />
        <Route path="manager-questions" element={<QuestionAnswer />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
