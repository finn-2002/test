import React from "react";

const EmployeeList = ({ employees = [], deleteEmployee, editEmployee }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.emp_id}>
                <td>{employee.emp_id}</td>
                <td>{employee.emp_name}</td>
                <td>{employee.dept_name || 'N/A'}</td>
                <td>{employee.gn_name || 'N/A'}</td>
                <td>${employee.emp_basicSalary.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => editEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => deleteEmployee(employee.emp_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
