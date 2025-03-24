import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Save, Upload, Download, Search, Edit, Plus, X,Trash2 } from 'lucide-react';

const ModuleTable = ({ module, columns }) => {
  const [moduleData, setModuleData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchDataFromDB();
  }, [module]);

  const fetchDataFromDB = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${module}/getData`);
      const result = await response.json();
      setModuleData(prevData => ({
        ...prevData,
        [module]: result
      }));
      setHasChanges(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
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
        setModuleData(prevData => ({
          ...prevData,
          [module]: jsonData
        }));
        setHasChanges(true);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleExport = () => {
    const currentModuleData = moduleData[module] || [];
    const worksheet = XLSX.utils.json_to_sheet(currentModuleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, module);
    XLSX.writeFile(workbook, `${module}.xlsx`);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${module}/saveData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduleData[module]),
      });
      
      if (response.ok) {
        setHasChanges(false);
        // Show success message
      }
    } catch (error) {
      console.error('Error saving data:', error);
      // Show error message
    }
    setIsLoading(false);
  };

  const handleAddNew = () => {
    setNewRecord({});
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
      const updatedData = [...moduleData[module]];
      updatedData[editingIndex] = newRecord;
      setModuleData(prevData => ({
        ...prevData,
        [module]: updatedData
      }));
    } else {
      // Add new record
      setModuleData(prevData => ({
        ...prevData,
        [module]: [...(prevData[module] || []), newRecord]
      }));
    }
    setHasChanges(true);
    handleModalClose();
  };

  const handleEdit = (index) => {
    setNewRecord(moduleData[module][index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const filteredData = (moduleData[module] || []).filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const updatedData = moduleData[module].filter((_, i) => i !== index);
      setModuleData(prevData => ({
        ...prevData,
        [module]: updatedData
      }));
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
      
      case 'file':
        return (
          <div className="flex items-center">
            <input
              type="file"
              onChange={onChange}
              className="hidden"
              id={`file-${column.name}`}
            />
            <label
              htmlFor={`file-${column.name}`}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
            >
              Choose File
            </label>
            <span className="ml-2 text-sm text-gray-600">
              {value ? value.split('\\').pop() : 'No file chosen'}
            </span>
          </div>
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
      <div className="p-3 md:p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-bold">{module.replace('-', ' ').toUpperCase()}</h3>
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
              {filteredData.length} Records
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
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 cursor-pointer flex items-center"
            >
              <Upload size={16} className="mr-2" />
              Import
            </label>
            <button
              onClick={handleExport}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export
            </button>
            {hasChanges && (
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center"
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
                      [column.name]: column.type === 'file' 
                        ? e.target.files[0]?.name 
                        : e.target.value
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
    </div>
  );
};

export default ModuleTable;

