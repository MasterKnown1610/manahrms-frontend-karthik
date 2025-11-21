import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import Layout from "./components/Layout/Layout";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Dashboard from "./screens/Dashboard/Dashboard";
import Employee from "./screens/Employee/Employee";
import EmployeeProfile from "./screens/EmployeeProfile/EmployeeProfile";
import OrganizationChart from "./screens/OrganizationChart/OrganizationChart";
import Task from "./screens/Task/Task";
import Report from "./screens/Report/Report";
import Calendar from "./screens/Calendar/Calendar";
import Messages from "./screens/Messages/Messages";
import Setting from "./screens/Setting/Setting";
import Support from "./screens/Support/Support";
import ContextState from "./contexts/contextState";
import "./styles/global.scss";

function App() {
  return (
    <ContextState>
      <ThemeProvider>
        <SidebarProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#5C2190",
                borderRadius: 8,
                fontFamily: "Poppins, sans-serif",
              },
            }}
          >
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/organization-chart"
                  element={<OrganizationChart />}
                />
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/employee/:id" element={<EmployeeProfile />} />
                  <Route path="/task" element={<Task />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/support" element={<Support />} />
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Route>
              </Routes>
            </Router>
          </ConfigProvider>
        </SidebarProvider>
      </ThemeProvider>
    </ContextState>
  );
}

export default App;
