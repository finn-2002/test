import React, { useState, useEffect } from "react";

const EmployeeForm = ({ saveEmployee, currentEmployee, departments, genders }) => {
  const [form, setForm] = useState({
    emp_id: "",
    emp_name: "",
    emp_deptId: "",
    emp_gender: "",
    emp_basicSalary: ""
  });

  // Populate form when editing an employee
  useEffect(() => {
    if (currentEmployee) {
      setForm(currentEmployee);
    } else {
      setForm({
        emp_id: "",
        emp_name: "",
        emp_deptId: "",
        emp_gender: "",
        emp_basicSalary: ""
      });
    }
  }, [currentEmployee]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEmployee(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="emp_name"
          value={form.emp_name}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Department</label>
        <select
          name="emp_deptId"
          value={form.emp_deptId}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.dept_id} value={dept.dept_id}>
              {dept.dept_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select
          name="emp_gender"
          value={form.emp_gender}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender.gn_id} value={gender.gn_id}>
              {gender.gn_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Basic Salary</label>
        <input
          type="number"
          name="emp_basicSalary"
          value={form.emp_basicSalary}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {form.emp_id ? "Update" : "Add"} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
