import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Save, Upload, Download, Search, Edit, Plus, X, Trash2, Settings } from 'lucide-react';

const DscManager = () => {
  const columns = [
    { name: 'Name', type: 'text' },
    { name: 'Mobile', type: 'text' },
    { name: 'Email', type: 'email' },
    { name: 'PAN', type: 'text' },
    { name: 'Tax', type: 'dropdown', options: ['Income', 'TDS', 'GST', 'Audit', 'ROC'] },
    { name: 'Issue Date', type: 'date' },
    { name: 'Expiry Date', type: 'date' },
    { name: 'Amount', type: 'number' },
    { name: 'Fee Status', type: 'dropdown', options: ['Paid', 'Unpaid'] },
    { name: 'By', type: 'text' },
    { name: 'Messages', type: 'text' }
  ];

  // Sample data with some upcoming expiry dates to test the popup
  const sampleData = [
    {
      'Sr.No': '1',
      'Name': 'Vishwas Mishra',
      'Mobile': '9996103258',
      'Email': 'temp@gmail.com',
      'PAN': 'AH797SGS8',
      'Tax': 'TDS',
      'Issue Date': '2025-02-05',
      'Expiry Date': '2025-02-10',
      'Amount': '3000',
      'Fee Status': 'Pending',
      'By': 'Admin',
      'Messages': 'Renewal needed'
    },
    {
      'Sr.No': '2',
      'Name': 'Siddhi Singhal',
      'Mobile': '9996103258',
      'Email': 'temp@gmail.com',
      'PAN': 'AH797SGS8',
      'Tax': 'TDS',
      'Issue Date': '2024-02-03',
      'Expiry Date': "2025-02-09",
      'Amount': '3000',
      'Fee Status': 'Pending',
      'By': 'Manager',
      'Messages': 'First time issue'
    },
    {
      'Sr.No': '3',
      'Name': 'Anshul Kansal',
      'Mobile': '9996103258',
      'Email': 'temp@gmail.com',
      'PAN': 'AH797SGS8',
      'Tax': 'TDS',
      'Issue Date': '2025-01-25',
      'Expiry Date': '2025-02-05',
      'Amount': '3000',
      'Fee Status': 'Paid',
      'By': 'Supervisor',
      'Messages': 'Regular renewal'
    }
  ];

  const [dscData, setDscData] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [showExpiryPopup, setShowExpiryPopup] = useState(false);
  const [expiryMessages, setExpiryMessages] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);


  const [selectedCategory, setSelectedCategory] = useState("all"); // Default: Show All
  const [showSettings, setShowSettings] = useState(false);

  // function for showing the user selection category
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setShowSettings(false); // Close settings after selection
  };

  const categories = [
    "srNo", "name", "mobile", "Tax", "Pan",
    "Issue Date", "amount", "feeStatus", "Expiry Date", "By",
    "Messages"
  ];

  useEffect(() => {
    checkExpiryDates();
  }, [dscData]);

  const checkExpiryDates = () => {
    const today = new Date();
    const notifications = [];

    dscData.forEach((dsc) => {
      if (dsc['Fee Status'] === 'Paid') return;

      const expiryDate = new Date(dsc['Expiry Date']);
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0 && diffDays <= 10) {
        notifications.push(`DSC for ${dsc.Name} will expire in ${diffDays} day(s).`);
      }
    });

    if (notifications.length > 0) {
      setExpiryMessages(notifications);
      setShowExpiryPopup(true);
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setDscData(jsonData);
        setHasChanges(true);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleExport = () => {
    const dataToExport = selectedRecords.length > 0
      ? dscData.filter((_, index) => selectedRecords.includes(index))
      : dscData;

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DSC');
    XLSX.writeFile(workbook, 'DSC.xlsx');
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dsc/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dscData),
      });

      if (response.ok) {
        setHasChanges(false);
        alert('Changes saved successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving changes');
    }
    setIsLoading(false);
  };

  const handleAddNew = () => {
    const newSrNo = dscData.length > 0
      ? Math.max(...dscData.map(item => parseInt(item['Sr.No']))) + 1
      : 1;

    setNewRecord({
      'Sr.No': newSrNo.toString(),
      'Issue Date': new Date().toISOString().split('T')[0],
      'Fee Status': 'Pending'
    });
    setEditingIndex(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewRecord({});
    setEditingIndex(null);
  };

  const handleModalSave = () => {
    if (editingIndex !== null) {
      // Edit existing record
      const updatedData = [...dscData];
      updatedData[editingIndex] = newRecord;
      setDscData(updatedData);
    } else {
      // Add new record
      setDscData([...dscData, newRecord]);
    }
    setHasChanges(true);
    handleModalClose();
  };

  const handleEdit = (index) => {
    setNewRecord(dscData[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleCheckboxChange = (index) => {
    setSelectedRecords(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRecords([...Array(filteredData.length).keys()]);
    } else {
      setSelectedRecords([]);
    }
  };

  const filteredData = dscData.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const updatedData = dscData.filter((_, i) => i !== index);
      setDscData(updatedData);
      setHasChanges(true);
    }
  };

  const renderInput = (column, value, onChange) => {
    switch (column.type) {
      case 'dropdown':
        return (
          <select
            value={value || ''}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select...</option>
            {column.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );

      default:
        return (
          <input
            type={column.type || 'text'}
            value={value || ''}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-3 md:p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-4">
          <div className="flex items-center space-x-4">
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
              {selectedRecords.length > 0 ? `${selectedRecords.length} Selected` : `${filteredData.length} Records`}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAddNew}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Add New
            </button>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImport}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors duration-200 cursor-pointer flex items-center"
            >
              <Download size={16} className="mr-2" />
              Import
            </label>
            <button
              onClick={handleExport}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
              disabled={isLoading}
            >
              <Upload size={16} className="mr-2" />
              {selectedRecords.length > 0 ? 'Export Selected' : 'Export All'}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors duration-200"
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>

              {showSettings && (
                <div className="absolute bg-white shadow-md rounded-lg p-3  right-0 top-full mt-2 border">
                  <label className="block text-black font-bold mb-2 px-5">Select Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>



            {hasChanges && (
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200 flex items-center"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute right-3 top-2.5 text-blue-200" size={20} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-auto md:table-fixed">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Select</th>
              {columns.map((column) => (
                <th key={column.name} className="py-3 px-6 text-left">
                  {column.name}
                </th>
              ))}
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </td>
                {columns.map((column) => (
                  <td key={column.name} className="py-3 px-6 text-left whitespace-nowrap">
                    {row[column.name] || '-'}
                  </td>
                ))}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="transform hover:text-purple-500 hover:scale-110"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="transform hover:text-red-500 hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingIndex !== null ? 'Edit Record' : 'Add New Record'}
              </h3>
              <button onClick={handleModalClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {columns.map((column) => (
                <div key={column.name} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={column.name}>
                    {column.name}
                  </label>
                  {renderInput(
                    column,
                    newRecord[column.name],
                    (e) => setNewRecord({
                      ...newRecord,
                      [column.name]: e.target.value
                    })
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleModalSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expiry Notification Popup */}
      {showExpiryPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">DSC Expiry Notifications</h3>
              <button onClick={() => setShowExpiryPopup(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-2">
              {expiryMessages.map((message, index) => (
                <div key={index} className="p-3 bg-red-50 text-red-700 rounded-lg">
                  {message}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowExpiryPopup(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DscManager;

