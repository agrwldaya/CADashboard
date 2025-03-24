import React, { useState } from "react";

const EmployeeTaskManager = () => {
  const employeeId = 1; // Example logged-in employee ID

  // Constants for assigned tasks
  const allTasks = [
    { id: 1, employeeId: 1, description: "Submit quarterly report", deadline: "2025-01-20", status: "Pending" },
    { id: 2, employeeId: 1, description: "Complete tax filings", deadline: "2025-01-25", status: "Pending" },
    { id: 3, employeeId: 1, description: "Update client database", deadline: "2025-01-18", status: "Completed" },
    { id: 4, employeeId: 2, description: "Review budget report", deadline: "2025-01-22", status: "Pending" }, // Task for another employee
  ];

  // Filtering tasks for the logged-in employee
  const assignedTasks = allTasks.filter((task) => task.employeeId === employeeId);
  const pendingTasks = assignedTasks.filter((task) => task.status === "Pending");
  const completedTasks = assignedTasks.filter((task) => task.status === "Completed");

  // Mark task as completed
  const markComplete = (taskId) => {
    const updatedTasks = assignedTasks.map((task) =>
      task.id === taskId ? { ...task, status: "Completed" } : task
    );
    // Re-calculate tasks after marking as completed
    setTasks(updatedTasks);
  };

  // State to simulate dynamic updates
  const [tasks, setTasks] = useState(assignedTasks);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      {/* Pending Tasks */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
        {pendingTasks.length > 0 ? (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Task</th>
                <th className="border px-4 py-2">Deadline</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks
                .filter((task) => task.status === "Pending")
                .map((task) => (
                  <tr key={task.id}>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2">{task.deadline}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => markComplete(task.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded-lg"
                      >
                        Mark Complete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No pending tasks.</p>
        )}
      </div>

      {/* Completed Tasks */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Completed Tasks</h2>
        {completedTasks.length > 0 ? (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Task</th>
                <th className="border px-4 py-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tasks
                .filter((task) => task.status === "Completed")
                .map((task) => (
                  <tr key={task.id}>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2">{task.deadline}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No completed tasks.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeTaskManager;
