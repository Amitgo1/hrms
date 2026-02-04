import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="dashboard-page">
      {/* TOP BAR */}
      <div className="dashboard-topbar">
        <h2 className="dashboard-title">📊 Dashboard</h2>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/attendance")}>Attendance</button>
          <button onClick={() => navigate("/")}>Add Employees</button>
        </div>
      </div>

      {loading && <p className="dashboard-loading">Loading employees...</p>}

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-icon">👥</div>
          <div>
            <h3>Total Employees</h3>
            <p className="dashboard-value">{list.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
