import React, { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  FileText,
  BookOpen,
  Building2,
  ClipboardList,
  Key,
  User,
  LogOut,
  Bell,
  Settings,
  Menu,
  DollarSign,
  FormInput,
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ModuleTable from "../Moduletable"
import ProfileForm from "./ProfileForm"
import DSC from "./DSC"
import Task from "./Task"
import EmployeeTaskManager from "./Employeetask"
import logo from "../../assets/logo.png"
import IncomeTax from "./IncomeTax"
import TDS from "./TDS"
import Audit from "./Audit"
import GST from "./GST"
import ROC from "./ROC"
import NewReqForm from "./NewReqForm"
 


const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [activeModule, setActiveModule] = useState("income-tax")
  const [notifications, setNotifications] = useState(3)

  const modules = [
    { id: "income-tax", name: "Income Tax", icon: <Calculator />, color: "from-blue-600 to-blue-800" },
    { id: "tds", name: "TDS", icon: <FileText />, color: "from-blue-600 to-blue-800" },
    { id: "audit", name: "Audit 3CA-3CB", icon: <BookOpen />, color: "from-blue-600 to-blue-800" },
    { id: "gst", name: "GST", icon: <DollarSign />, color: "from-blue-600 to-blue-800" },
    { id: "roc", name: "ROC", icon: <Building2 />, color: "from-blue-600 to-blue-800" },
    { id: "task", name: "Task Manager", icon: <ClipboardList />, color: "from-blue-600 to-blue-800" },
    { id: "dsc", name: "DSC Manager", icon: <Key />, color: "from-blue-600 to-blue-800" },
    { id: "employee", name: "Employee Task Manager", icon: <User />, color: "from-blue-600 to-blue-800" },
    { id: "NewReqForm", name: "New Request Form", icon: <FormInput />, color: "from-blue-600 to-blue-800" },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const handleContentClick = () => {
    if (isSidebarOpen && window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <motion.div
        className={`
          fixed md:sticky md:top-0
          z-30 md:z-auto
          h-screen
          bg-gradient-to-b from-gray-900 to-gray-800 
          text-white
          shadow-xl
          flex flex-col
          ${isSidebarOpen ? "w-64" : "w-0 md:w-20"}
          transition-all duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-hidden
        `}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <>
            <div className="p-4 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
              {isSidebarOpen && (
                <h1 className="font-bold text-xl">
                  <span className="text-blue-400">CA</span> Dashboard
                </h1>
              )}
            </div>

            <nav className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-2 md:p-4">
                <ul className="space-y-2">
                  {modules.map((module) => (
                    <li key={module.id}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveModule(module.id)
                          if (window.innerWidth < 768) setSidebarOpen(false)
                        }}
                        className={`w-full flex items-center p-2 rounded-lg transition-all duration-200 ${
                          activeModule === module.id
                            ? `bg-gradient-to-r ${module.color} text-white shadow-lg`
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <span className="flex-shrink-0 mr-3">{module.icon}</span>
                        {isSidebarOpen && <span className="font-medium truncate">{module.name}</span>}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="p-2 md:p-4 border-t border-gray-700 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveModule("profile")
                  if (window.innerWidth < 768) setSidebarOpen(false)
                }}
                className="w-full flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <User className="flex-shrink-0 mr-3" />
                {isSidebarOpen && <span className="font-medium">Profile</span>}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center p-2 rounded-lg hover:bg-red-600 transition-colors duration-200 mt-2 text-red-400 hover:text-white"
              >
                <LogOut className="flex-shrink-0 mr-3" />
                {isSidebarOpen && <span className="font-medium">Logout</span>}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-auto overflow-hidden" onClick={handleContentClick}>
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-10 p-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={logo || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center">
              {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setNotifications(0)}
                className="p-2 rounded-lg hover:bg-gray-300 mr-2 relative"
              >
                <Bell size={24} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {notifications}
                  </span>
                )}
              </motion.button> */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-300"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <header className="hidden md:block bg-gray-900 shadow-md p-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img src={logo || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
            </Link>
            {/* <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setNotifications(0)}
                className="p-2 rounded-lg hover:bg-gray-300 relative"
              >
                <Bell size={24} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {notifications}
                  </span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-gray-300"
              >
                <Settings size={24} />
              </motion.button>
            </div> */}
             <div className="border border-gray-500 text-white p-3 rounded-lg shadow-md">
              <p className="font-semibold">Client: Ajay Kumar</p>
              <p>Valid to: 22/03/2025 - 21/03/2026</p>
              <p>Activation: 12345687</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-gray-100 to-gray-200 mt-20 md:mt-0">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              key={activeModule}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-3xl font-bold mb-6 text-gray-800  ${activeModule === 'income-tax' ? 'text-center' : ''}`}
            >
              {modules.find((m) => m.id === activeModule)?.name || "Dashboard"}
            </motion.h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeModule === "income-tax" ? (
                  <IncomeTax />
                ) : activeModule === "tds" ? (
                  <TDS />
                ) : activeModule === "audit" ? (
                  <Audit />
                ) : activeModule === "gst" ? (
                  <GST />
                ) : activeModule === "dsc" ? (
                  <DSC />
                ) : activeModule === "roc" ? (
                  <ROC />
                ) : activeModule === "task" ? (
                  <Task />
                ) : activeModule === "profile" ? (
                  <ProfileForm />
                ) : activeModule === "employee" ? (
                  <EmployeeTaskManager />
                ) :  activeModule === "NewReqForm" ? (
                    <NewReqForm/>
                ) : (
                  <ModuleTable
                    module={activeModule}
                    columns={modules.find((m) => m.id === activeModule)?.columns || []}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

