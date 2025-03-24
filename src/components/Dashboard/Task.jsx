import React, { useState } from 'react';

const Task = () => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', userId: '', password: '' });
  const [newTask, setNewTask] = useState({ employeeId: '', description: '', deadline: '' });

  // Add employee
  const addEmployee = () => {
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    setNewEmployee({ name: '', userId: '', password: '' });
  };

  // Assign task
  const assignTask = () => {
    setTasks([...tasks, { ...newTask, id: Date.now(), status: 'Pending' }]);
    setNewTask({ employeeId: '', description: '', deadline: '' });
  };

  // Mark task as complete
  const markComplete = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'Completed' } : task));
  };

  return (
    <div className="p-4">

      {/* Add Employee */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="User ID"
            value={newEmployee.userId}
            onChange={(e) => setNewEmployee({ ...newEmployee, userId: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={newEmployee.password}
            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
          <button
            onClick={addEmployee}
            className="bg-sky-500 text-white py-2 px-4 rounded-lg"
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Assign Task */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <div className="space-y-4">
          <select
            value={newTask.employeeId}
            onChange={(e) => setNewTask({ ...newTask, employeeId: e.target.value })}
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
          <input
            type="date"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
          <button
            onClick={assignTask}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Assign Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Task List</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Task</th>
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Deadline</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">
                  {employees.find(e => e.id === task.employeeId)?.name || 'Unknown'}
                </td>
                <td className="border px-4 py-2">{task.deadline}</td>
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border px-4 py-2">
                  {task.status === 'Pending' && (
                    <button
                      onClick={() => markComplete(task.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                    >
                      Mark Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;