import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import PageLoading from "./components/PageLoading";
import HomePage from "./pages/HomePage";
import Login from "./pages/Student/LoginPage";
import NoticeBoard from "./pages/Student/NoticeBoard";
import LiveLecture from "./pages/Student/LiveLecture";
import TimeTable from "./pages/Student/TimeTable";
import LoginPage from "./pages/Teacher/AdminLoginPage";
import TeacherClassUI from "./pages/Teacher/TeacherClassPage";
import StudentLayout from "./layouts/StudentLayout";
import StudentManagement from "./pages/Teacher/StudentManagement";
import AdminLayout from "./layouts/AdminLayout";
import SmsCampaign from "./pages/Teacher/SmsCampaign";
import AdminHome from "./pages/Teacher/AdminHome";
import StudentQuestions from "./pages/Teacher/StudentQuestions";
import StudentSmsCampaign from "./pages/Teacher/StudentSmsCampaign";
import SettingsPage from "./pages/Teacher/SettingsPage";
import StudentAttendance from "./pages/Teacher/StudentAttendance";


function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Router>
        <Routes>
          <Route index element={<HomePage />} /> {/* Index route */}
          <Route path="login" element={<Login />} />
          <Route element={<StudentLayout />}>
            <Route path="notice" element={<NoticeBoard />} />
            <Route path="live" element={<LiveLecture />} />
            <Route path="time" element={<TimeTable />} />
          </Route>
          <Route path="adminlogin" element={<LoginPage />} />
          <Route element={<AdminLayout />}>
            <Route path="Admin/adminhome" element={<AdminHome />} />
            <Route path="Admin/student" element={<StudentManagement />} />
            <Route path="Admin/classlink" element={<TeacherClassUI />} />
            <Route path="Admin/sms" element={<SmsCampaign />} />
            <Route path="/studentsms" element={<StudentSmsCampaign />} />
            <Route path="Admin/studentQA" element={<StudentQuestions />} />
            <Route path="Admin/setting" element={<SettingsPage />} />
            <Route path="Admin/attendce" element={<StudentAttendance />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
