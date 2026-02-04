import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  addEmployee,
  deleteEmployee,
} from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";
import "./Employees.css";

export default function Employees() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading, error } = useSelector((state) => state.employee);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const submit = () => {
    if (!form.employee_id || !form.full_name) return;
    dispatch(addEmployee(form));
    setForm({ employee_id: "", full_name: "", email: "", department: "" });
  };

  return (
    <div className="employees-page">
      {/* TOP BAR */}
      <div className="employees-topbar">
        <h1>👨‍💼 Employees</h1>
        <div className="employees-actions">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/attendance")}>Attendance</button>
        </div>
      </div>

      {/* ADD EMPLOYEE */}
      <div className="employees-card">
        <h2>Add Employee</h2>

        <div className="employees-form">
          <input
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          />
          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
        </div>

        <button className="add-btn" onClick={submit}>
          Add Employee
        </button>
      </div>

      {/* EMPLOYEE LIST */}
      <div className="employees-card">
        <h2>Employee List</h2>

        {loading && <p className="state">Loading...</p>}
        {error && <p className="state error">Something went wrong</p>}
        {!loading && list.length === 0 && (
          <p className="state">No employees found</p>
        )}

        {list.map((emp) => (
          <div className="employees-row" key={emp.id}>
            <div>
              <strong>{emp.full_name}</strong>
              <div className="employees-meta">
                {emp.department} • {emp.email}
              </div>
            </div>

            <button
              className="delete-btn"
              onClick={() => dispatch(deleteEmployee(emp.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
