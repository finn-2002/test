"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "../app/components/employeeForm";
import EmployeeList from "../app/components/employee";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [genders, setGenders] = useState([]);

  // Fetch employee records, departments, and genders when component loads
  useEffect(() => {
    retrieveEmployees();
    fetchDepartments();
    fetchGenders();
  }, []);

  // Retrieve all employees
  const retrieveEmployees = async () => {
    try {
      const response = await axios.get("http://localhost/api/employee/exam.php?operation=retrieveRecord");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error retrieving employees:", error);
    }
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost/api/employee/exam.php?operation=getDepartments");
      if (response.data.error) {
        console.error(response.data.error);
      } else {
        setDepartments(response.data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch genders
  const fetchGenders = async () => {
    try {
      const response = await axios.get("http://localhost/api/employee/exam.php?operation=getGenders");
      if (response.data.error) {
        console.error(response.data.error);
      } else {
        setGenders(response.data);
      }
    } catch (error) {
      console.error("Error fetching genders:", error);
    }
  };

  // Create or Update an employee
  const saveEmployee = async (employee) => {
    const operation = employee.emp_id ? "updateRecord" : "createRecord";
    try {
      const response = await axios.post("http://localhost/api/employee/exam.php", {
        operation,
        json: employee
      });
      console.log(response.data);
      retrieveEmployees(); // Refresh the list of employees
      setCurrentEmployee(null); // Reset form
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // Delete an employee
  const deleteEmployee = async (emp_id) => {
    try {
      await axios.post("http://localhost/api/employee/exam.php", {
        operation: "deleteRecord",
        json: { emp_id }
      });
      retrieveEmployees(); // Refresh the list of employees
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Edit employee
  const editEmployee = (employee) => {
    setCurrentEmployee(employee);
  };

  return (
    <div className="container">
      <h1>Employee Management</h1>
      <EmployeeForm
        saveEmployee={saveEmployee}
        currentEmployee={currentEmployee}
        departments={departments}
        genders={genders}
      />
      <EmployeeList
        employees={employees}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />
    </div>
  );
};

export default App;
