import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchEmployees } from "../redux/employeeSlice";
import { markAttendance } from "../redux/attendanceSlice";
import { useNavigate } from "react-router-dom";
import "./Attendance.css";

export default function Attendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.employee);

  const [data, setData] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const submit = () => {
    if (!data.employee || !data.date) {
      alert("Please select employee and date");
      return;
    }
    dispatch(markAttendance(data));
    alert("Attendance Marked Successfully ✅");
  };

  return (
    <div className="attendance-page">
      {/* TOP BAR */}
      <div className="attendance-topbar">
        <h1>📋 Attendance</h1>

        <div className="attendance-actions">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/")}>Add Employee</button>
        </div>
      </div>

      {/* CARD */}
      <div className="attendance-card">
        <h2>Mark Attendance</h2>
        <p className="attendance-subtitle">
          Select employee and attendance status
        </p>

        <label>Employee</label>
        <select
          value={data.employee}
          onChange={(e) => setData({ ...data, employee: e.target.value })}
        >
          <option value="">Select Employee</option>
          {list.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name} ({emp.email})
            </option>
          ))}
        </select>

        <label>Date</label>
        <input
          type="date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />

        <label>Status</label>
        <div className="attendance-status">
          {["Present", "Absent"].map((s) => (
            <button
              key={s}
              className={data.status === s ? "active" : ""}
              onClick={() => setData({ ...data, status: s })}
            >
              {s}
            </button>
          ))}
        </div>

        <button className="attendance-submit" onClick={submit}>
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
